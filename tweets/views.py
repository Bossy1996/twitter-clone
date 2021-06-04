from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .forms import TweetForm
from .models import Tweet
import random

# Create your views here.

def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1> Hello world </h1>")
    return render(request, 'pages/index.html', context={}, status=200)

def tweet_create_view(request, *args, **kargs):
    form = TweetForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        form = TweetForm()
    return render(request, "pages/index.html", context={"form": form}, status=200)

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    return json data
    """
    qs = Tweet.objects.all()
    tweet_list = [{"id": x.id, "content": x.content, "likes": random.randint(0, 10000000)} for x in qs]
    data = {
        "isUser": False,
        "response": tweet_list
    }
    return JsonResponse(data)

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Comsume by JavaScript or Swift or Java or IOS/Android
    return json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not found"
        status = 404
    return JsonResponse(data, status=status)