import urllib.parse
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from .models import RemoteGame

def check_gm_status(self):
    username = self.user.get_username()
    if not username in self.player_list or not self.player_list[username]['gm_status']:
        return False
    return True

class RemoteGameConsumer(JsonWebsocketConsumer):

    player_list = {}

    def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']

        if str(self.scope["user"]) == "AnonymousUser":
            params = urllib.parse.parse_qs(self.scope['query_string'].decode('utf8'))
            token = params.get('token', (None,))[0]
            self.scope["user"] = Token.objects.get(key=token).user

        self.user = self.scope["user"]

        if self.user != None:
            isGM = len(self.player_list) == 0
            self.player_list[self.user.get_username()] = {'gm_status': isGM}
        else:
            self.close()

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.game_id,
            self.channel_name
        )
        self.accept()

        async_to_sync(self.channel_layer.group_send)(
            self.game_id,
            {
                'type': 'update_player_list'
            }
        )

    def disconnect(self, close_code):
        msg_type = 'update_player_list'
        if self.player_list[self.user.get_username()]['gm_status']:
            msg_type = 'close_game'
            RemoteGame.objects.filter(id=self.game_id).delete()

        del self.player_list[self.user.get_username()]
        async_to_sync(self.channel_layer.group_send)(
            self.game_id,
            {
                'type': msg_type
            }
        )

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.game_id,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive_json(self, content):
        auth_routes = ['update_deck']
        msg_type = content.get('type')
        data = content.get('data')

        if msg_type in auth_routes and not check_gm_status(self):
            self.send_json({
                'type': 'no_auth',
                'data': 'You are not authorized to do that.'
            })
            return

        # Send game info to all clients
        async_to_sync(self.channel_layer.group_send)(
            self.game_id,
            {
                'type': msg_type,
                'data': data,
                'from': self.user.get_username()
            }
        )

    # Sends the updated player list to all players when a player enters or leaves the game
    def update_player_list(self, event):
        # Send message to WebSocket
        self.send_json({
            'data': list(self.player_list),
            'type': 'player_list',
        })

    def update_deck(self, event):
        self.send_json({
            'type': 'draw',
            'data': event.get('data'),
            'from': event.get('from')
        })

    def close_game(self, event):
        self.send_json({
            'type': 'close_game'
        })
        

        