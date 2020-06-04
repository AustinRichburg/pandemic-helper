from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    # path('login', views.LoginView.as_view(), name='login'),
    path('signup', views.SignupView.as_view(), name='signup'),
    path('login/', obtain_auth_token, name='api_token_auth')
]
