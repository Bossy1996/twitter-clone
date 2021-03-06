from django.db import models

from rest_framework import fields, serializers
from rest_framework.decorators import action

from .models import Tweet

MAX_TWEET_LENGTH = 240
TWEET_ACTION_OPTIONS = ["like", "unlike", "retweet"]

class TweetActionSerializer(serializers.SerializerMethodField):
    
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for tweet")
        return value

class TweetCreateSerializer(serializers.ModelSerializer):

    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes']
    
    def get_likes(self, object):
        
        return object.likes.count()

    def validate(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value

class TweetSerializer(serializers.ModelSerializer):

    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'is_retweet', 'parent']

    def get_likes(self, object):
        
        return object.likes.count()