from django.contrib import admin
from django.db import models
from django.db.models.base import Model

from .models import Tweet, Tweet_likes

# Register your models here.

class TweetLikeAdmin(admin.TabularInline):
    model = Tweet_likes

class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ["__str__", "user"]
    search_fields = ["content", "user__username", "user__email"]

    class Meta:
        Model = Tweet

admin.site.register(Tweet, TweetAdmin)