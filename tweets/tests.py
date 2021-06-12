from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Tweet
# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username='abc', password='somepassword')
