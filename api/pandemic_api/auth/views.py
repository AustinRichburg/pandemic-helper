import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# class LoginView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         req = json.loads(request.body)
#         username = req['email']
#         password = req['password']
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             login(request, user)
#             message = 'login successful'
#         else:
#             message = 'login failed'
#         return JsonResponse({'message': message})

class SignupView(APIView):
    def post(self, request):
        req = json.loads(request.body)
        username = req['email']
        email = req['email']
        password = req['password']
        user = User.objects.create_user(username, email, password)
        return JsonResponse({'message': 'signup successful'})
