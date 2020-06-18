import json
import string
import random

from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from .models import Game, RemoteGame

class GameView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        gameList = Game.objects.filter(game_master=user.get_username()).values()
        return JsonResponse({'data': list(gameList)})

    def post(self, request):
        req = json.loads(request.body)
        print(req)
        id = req['id']
        name = req['name']
        deck = req['game']
        game = Game(id=id, name=name, deck=deck, game_master=request.user.get_username())
        game.save()
        return JsonResponse({'message': 'save successful'})

class RemoteGameView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({'message': 'get game'})

    def post(self, request):
        req = json.loads(request.body)
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        game_name = req['name']
        game = RemoteGame(id=id, name=game_name, game_master=request.user.get_username())
        game.save()
        return JsonResponse({'message': 'created game', 'id': id})
        