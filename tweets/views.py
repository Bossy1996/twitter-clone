from django.shortcuts import render
from rest_framework import permissions, serializers

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Tweet
from .serializers import (
    TweetSerializer,
    TweetCreateSerializer,
    TweetActionSerializer
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tweet_view(request, *args, **kwargs):
    """
    Creates a new Tweet from request data
    """
    serializer = TweetSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def delete_tweet_view(request, tweet_id, *args, **kwargs):
    """
    Deletes a Tweet based on  tweet_id
    """
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data)

def action_tweet_view():
    """
    Three actions: Like, Unlike and Retweet
    """
    pass

def tweet_detail_view():
    """In Detail view of the tweet, requieres tweet_id"""
    pass

def tweet_list_view():
    """Tweet list view where it's show all the tweets"""
    pass