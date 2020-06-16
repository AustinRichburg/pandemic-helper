import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user is not None:
            login(request, user)
            message = 'login successful'
        else:
            message = 'login failed'
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

@permission_classes((permissions.AllowAny,))
class SignupView(APIView):

    queryset = User.objects.all()

    def post(self, request):
        req = json.loads(request.body)
        username = req['username']
        email = req['username']
        password = req['password']
        user = User.objects.create_user(username, email, password)
        return JsonResponse({'message': 'signup successful'})
