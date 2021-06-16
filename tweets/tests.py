from django.contrib.auth import get_user_model
from django.test import TestCase, client

from rest_framework.test import APIClient

from .models import Tweet
# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='def', password='somepassword')
        Tweet.objects.create(content="My first tweet", user=self.user)

    def test_tweet_created(self):
        tweet = Tweet.objects.create(content="My second tweet", user=self.user)
        self.assertEqual(tweet.id, 2)
        self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client
    
    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()))