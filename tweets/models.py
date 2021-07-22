from django.db import models
from django.db.models.deletion import CASCADE
from users.models import User
# Create your models here.
class Tweet_likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

class Tweet(models.Model):
    
    parent = models.ForeignKey("self", on_delete=models.CASCADE)
    content = models.CharField(max_length=240, blank=False, null=False)
    media = models.FileField(upload_to="media/", blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='tweet_user', blank=True, through=Tweet_likes)
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self) -> str:
        return self.content

    @property
    def is_retweet(self):
        return self.parent != None