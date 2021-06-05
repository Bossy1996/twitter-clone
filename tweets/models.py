from django.db import models
import random
# Create your models here.

class Tweet(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    media = models.FileField(upload_to='media/', blank=True, null=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 100)
        }
    