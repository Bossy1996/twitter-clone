from django.urls import path

from .views import (
    create_tweet_view,
    delete_tweet_view,
    action_tweet_view,
    tweet_detail_view,
    tweet_list_view
)

"""
CLIENT
Base ENDPOINT /api/tweets/
"""

urlpatterns = [
    path('', tweet_list_view),
    path('action/', action_tweet_view),
    path('create/', create_tweet_view),
    path('<int:tweet_id>', tweet_detail_view),
    path('<int:tweet_id>/delete', delete_tweet_view),
]