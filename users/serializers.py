from re import search
from django.db import models

from rest_framework import fields, serializers
from rest_framework.decorators import action

from .models import User

class UserChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email']

class UserSerializer(serializers.ModelSerializer):
    
    """ email = serializers.EmailField()
    password = serializers.CharField(max_lenght=16) """
    
    class Meta:
        model = User
        fields = ['email']
