import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from .models import Game

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
        