from django.urls import path

from .views import (
    home_view, 
    tweet_list_view, 
    tweet_detail_view, 
    tweet_create_view, 
    tweet_delete_view, 
    tweet_action_view
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view),
    path('tweet/', tweet_list_view),
    path('tweet/<int:tweet_id>', tweet_detail_view),
    path('create-tweet', tweet_create_view),
    path('login/', tweet_list_view),
    path('api/tweet/<int:tweet_id>/delete', tweet_delete_view),
    path('api/tweet/action', tweet_action_view),
]
