from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Tweet
# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username='abc', password='somepassword')

# this is a cheat comment because it's too hot outside, and I'm broken mentally i can't even get out of my bed.
# sorry for this but i trully can't.