import urllib.parse
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.authtoken.models import Token

class RemoteGameConsumer(JsonWebsocketConsumer):

    player_list = []

    def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']

        if str(self.scope["user"]) == "AnonymousUser":
            params = urllib.parse.parse_qs(self.scope['query_string'].decode('utf8'))
            token = params.get('token', (None,))[0]
            self.scope["user"] = Token.objects.get(key=token).user

        self.user = self.scope["user"]

        if self.user != None:
            self.player_list.append(self.user.get_username())

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
        self.player_list.remove(self.user.get_username())
        async_to_sync(self.channel_layer.group_send)(
            self.game_id,
            {
                'type': 'update_player_list'
            }
        )

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.game_id,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive_json(self, content):
        msg_type = content.get('type')
        data = content.get('data')

        # Send game info to all clients
        async_to_sync(self.channel_layer.group_send)(
            self.game_id,
            {
                'type': msg_type,
                'data': data,
                'from': self.user.get_username()
            }
        )

    # Receive message from room group
    def update_player_list(self, event):
        # Send message to WebSocket
        self.send_json({
            'data': self.player_list,
            'type': 'player_list',
        })

    def update_deck(self, event):
        self.send_json({
            'type': 'draw',
            'data': event.get('data'),
            'from': event.get('from')
        })