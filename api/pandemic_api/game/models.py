from django.db import models

class Game(models.Model):
    id = models.CharField(max_length=35, primary_key=True, unique=True)
    name = models.CharField(max_length=75)
    game_master = models.CharField(max_length=150, default='')
    date_created = models.DateTimeField(auto_now_add=True)
    deck = models.TextField(max_length=2000)

    class Meta:
      db_table = "game_info"

class RemoteGame(models.Model):
    id = models.CharField(max_length=6, primary_key=True, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "remote_games"