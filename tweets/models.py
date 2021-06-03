from django.db import models

# Create your models here.

class Tweet(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    media = models.FileField(upload_to='media/', blank=True, null=True)
    