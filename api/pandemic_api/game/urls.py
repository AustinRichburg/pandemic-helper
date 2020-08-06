from django.urls import path, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.GameData.as_view()),
    re_path('remote/(?:(?P<game_id>\w+)/)?$', views.RemoteGameView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)