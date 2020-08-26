import threading, json
from django.core.exceptions import ObjectDoesNotExist

from .classes.Game import Game
from .models import RemoteGame, Game as SaveGame

class ThreadPool:

    threads: dict = {}

    @classmethod
    def add_game(cls, game_id, consumer_instance):
        game = Game()
        game_master = RemoteGame.objects.get(id=game_id).game_master
        name = None

        try:
            prev_game = SaveGame.objects.get(id=game_id)
            name = prev_game.name
            json_game_deck = prev_game.deck.replace("'", "\"")
            game.load_game(json.loads(json_game_deck))
        except ObjectDoesNotExist:
            pass

        cls.threads[game_id] = {
            'thread': threading.Thread(),
            'name': name or 'default',
            'game_master': game_master,
            'game': game,
            'playerlist': {}
        }
        thread = cls.threads[game_id]['thread']
        thread.daemon = True
        thread.start()