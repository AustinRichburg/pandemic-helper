import urllib.parse, json
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from .models import RemoteGame, Game as SaveGame
from .classes.Game import Game

class GameConsumer(JsonWebsocketConsumer):

    playerlist: list = []
    game: Game = Game()

    def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']

        if str(self.scope["user"]) == "AnonymousUser":
            params = urllib.parse.parse_qs(self.scope['query_string'].decode('utf8'))
            token = params.get('token', (None,))[0]
            self.scope["user"] = Token.objects.get(key=token).user

        if self.scope["user"] != None:
            self.playerlist.append(self.scope["user"].get_username())
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

        self.send_updated_deck()

        print("self.playerlsit, : " + str(self.playerlist))

    def disconnect(self, close_code):
        msg_type = 'update_player_list'

        self.playerlist.remove(self.scope["user"].get_username())

        if len(self.playerlist) == 0:
            msg_type = 'close_game'
            # RemoteGame.objects.filter(id=self.game_id).delete()

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
        msg_type = content.get('type')
        data = content.get('data', None)

        is_game_over = False
        if msg_type == 'draw':
            self.game.draw_card(data)
        if msg_type == 'epidemic':
            is_game_over = self.game.epidemic()
        if msg_type == 'save':
            game_dict = self.game.save_game_dict()
            game = SaveGame(id=self.game_id, name='default', deck=game_dict, game_master=self.scope["user"].get_username())
            game.save()
            self.send_json({
                'type': 'save',
                'data': True
            })
            return
        if msg_type == 'load':
            game = list(SaveGame.objects.filter(id=data).values())
            game_deck = game[0]['deck']
            json_game_deck = game_deck.replace("'", "\"")
            self.game.load_game(json.loads(json_game_deck))
            msg_type = 'draw'

        if is_game_over:
            msg_type = 'game_over'

        # Send game info to all clients
        async_to_sync(self.channel_layer.group_send)(
            self.game_id,
            {
                'type': msg_type,
                'data': data,
                'from': self.scope["user"].get_username()
            }
        )

    # Sends the updated player list to all players when a player enters or leaves the game
    def update_player_list(self, event):
        # Send message to WebSocket
        self.send_json({
            'data': self.playerlist,
            'type': 'player_list',
        })

    def draw(self, event):
        self.send_updated_deck()

    def epidemic(self, event):
        self.send_updated_deck()

    def close_game(self, event):
        self.send_json({
            'type': 'close_game'
        })

    def game_over(self, event):
        self.send_json({
            'type': 'game_over'
        })

    def add_note(self, event):
        city = event.get('data').get('city')
        note = event.get('data').get('note')

        self.game.add_note(city, note)

        self.send_json({
            'type': 'add_note',
            'data': {
                'city': city,
                'note': note
            },
            'from': event.get('from')
        })

    def remove_note(self, event):
        city = event.get('data').get('city')
        index = event.get('data').get('index')

        self.game.delete_note(city, index)

        self.send_json({
            'type': 'remove_note',
            'data': {
                'city': city,
                'index': index
            },
            'from': event.get('from')
        })

    def send_updated_deck(self):
        self.send_json({
            'type': 'update_game',
            'data': self.game.to_dict(),
            'from': self.scope["user"].get_username()
        })
