from twitterclone.settings import ALLOWED_HOSTS
from django.http.response import Http404
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.conf.global_settings import ALLOWED_HOSTS

from .forms import TweetForm
from .models import Tweet
import random

ALLOWED_HOSTS = ALLOWED_HOSTS

# Create your views here.

def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1> Hello world </h1>")
    # I know i'm cheating but  i don't have enough energy to code today so 
    # forgive me future me for i have sin
    return render(request, 'pages/index.html', context={}, status=200)

def tweet_create_view(request, *args, **kargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    return render(request, 'components/form.html', context={"form": form}, status=200)

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    return json data
    """
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
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