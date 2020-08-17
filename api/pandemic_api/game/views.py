import json, string, random

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import Game, RemoteGame

# View to save and load games
class GameData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        gameList = Game.objects.filter(game_master=user.get_username()).values()
        return Response({'data': list(gameList)})

    def post(self, request):
        req = json.loads(request.body)
        print(req)
        id = req['id']
        name = req['name']
        deck = req['game']
        game = Game(id=id, name=name, deck=deck, game_master=request.user.get_username())
        game.save()
        return Response({'data': 'save successful'})

#View to create and join remote games
class RemoteGameView(APIView):
    permission_classes = [IsAuthenticated]
    ID_LENGTH = 6

    def create_game_id(self, len):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=len))

    def get(self, request, **kwargs):
        """
        Join a remote game (if one is found)
        """

        game_id = kwargs.get('game_id', None)
        if game_id == None:
            return Response('Game ID required.', status=status.HTTP_400_BAD_REQUEST)

        game = RemoteGame.objects.filter(id=game_id).values()
        if not game:
            return Response('Game not found.', status=status.HTTP_404_NOT_FOUND)

        return Response({'data': list(game)})

    def post(self, request):
        """
        Creates a new remote game, generating a unique code that will allow others to join.
        """

        req = json.loads(request.body)
        id = self.create_game_id(self.ID_LENGTH)

        while RemoteGame.objects.filter(id=id).values():
            id = self.create_game_id(self.ID_LENGTH)

        game = RemoteGame(id=id)
        game.save()
        return Response({'data': 'created game', 'id': id})
        