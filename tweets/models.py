from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL

import random
# Create your models here.
User = AUTH_USER_MODEL

class Tweet(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE) # many user can many tweets
    content = models.TextField()
    media = models.FileField(upload_to='media/', blank=True, null=True)

    class Meta:
        ordering = ['-id']
    
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 100)
        }
    