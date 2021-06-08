from django.db import models
from rest_framework import fields, serializers
from .models import Tweet

MAX_TWEET_LENGTH = 240

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['content']

    def validate(self, value):
        # content = self.cleaned_data.get("content")
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value