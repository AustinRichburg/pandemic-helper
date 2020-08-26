import urllib.parse, json
import redis
from django.core.exceptions import ObjectDoesNotExist
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from .models import RemoteGame, Game as SaveGame
from .classes.Game import Game
from .threadpool import ThreadPool

class GameConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.thread = None

    def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']

        if str(self.scope["user"]) == "AnonymousUser":
            params = urllib.parse.parse_qs(self.scope['query_string'].decode('utf8'))
            token = params.get('token', (None,))[0]
            self.scope["user"] = Token.objects.get(key=token).user

        if self.scope["user"] == None:
            self.close()

        if self.game_id not in ThreadPool.threads:
            ThreadPool.add_game(self.game_id, self)
        
        self.thread = ThreadPool.threads[self.game_id]
        self.thread['playerlist'][self.scope["user"].get_username()] = self.is_game_master()

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

        self.game_setup()

    def disconnect(self, close_code):
        msg_type = 'update_player_list'

        del self.thread['playerlist'][self.scope["user"].get_username()]

        if len(self.thread['playerlist']) == 0:
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
    
    def receive_json(self, content):
        msg_type = content.get('type')
        data = content.get('data', None)
        is_game_over = False

        #TODO: create a new exception instead of using generic one
        # The group send at the end of this function will run once for each person connected to the group,
        # so all logic that needs to only be executed once happens here.
        try:
            if msg_type == 'draw':
                didDraw = self.thread['game'].draw_card(data)
                if not didDraw:
                    return
            elif msg_type == 'epidemic':
                is_game_over = self.thread['game'].epidemic()
            elif msg_type == 'save':
                if not self.is_game_master(): raise Exception('Unauthorized')
                game_dict = self.thread['game'].save_game_dict()
                defaults = { 'name': content.get('name', ''), 'deck': game_dict }
                game = SaveGame.objects.update_or_create(id=self.game_id, game_master=self.scope["user"].get_username(), defaults=defaults)
            elif msg_type == 'load':
                if not self.is_game_master(): raise Exception('Unauthorized')
                game = list(SaveGame.objects.filter(id=data).values())
                game_deck = game[0]['deck']
                json_game_deck = game_deck.replace("'", "\"")
                self.thread['game'].load_game(json.loads(json_game_deck))
            elif msg_type == 'new_game':
                if not self.is_game_master(): raise Exception('Unauthorized')
                self.thread['game'] = Game()
        except Exception as e:
            self.send_json({'type': 'unauthorized'})
            return

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

    def update_player_list(self, event):
        self.send_json({
            'type': 'player_list',
            'data': self.thread['playerlist'],
            'is_gm': self.is_game_master()
        })

    def draw(self, event):
        self.send_json({
            'type': 'draw'
        })
        self.send_updated_deck()

    def epidemic(self, event):
        self.send_json({
            'type': 'epidemic'
        })
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

        self.thread['game'].add_note(city, note)

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

        self.thread['game'].delete_note(city, index)

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
            'data': self.thread['game'].to_dict(),
            'from': self.scope["user"].get_username()
        })

    def name(self, event):
        self.thread['name'] = event.get('data')

        self.send_json({
            'type': 'name',
            'data': self.thread['name'],
            'from': self.scope["user"].get_username()
        })
    
    def game_setup(self):
        self.send_json({
            'type': 'game_setup',
            'deck': self.thread['game'].to_dict(),
            'name': self.thread['name']
        })

    def save(self, event):
        self.send_json({
            'type': 'save',
            'data': True
        })

    def load(self, event):
        self.send_json({
            'type': 'load',
            'data': True
        })
        self.send_updated_deck()

    def new_game(self, event):
        self.send_json({
            'type': 'new_game'
        })
        self.send_updated_deck()  

    def is_game_master(self):
        return self.thread['game_master'] == self.scope["user"].get_username()
