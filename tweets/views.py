from django.shortcuts import render, redirect

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .forms import TweetForm
from .models import Tweet
from .serializers import TweetSerializer
import random

#ALLOWED_HOSTS = ALLOWED_HOSTS
LOGIN_URL = '/login'

# Create your views here.

def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1> Hello world </h1>")
    # I know i'm cheating but  i don't have enough energy to code today so 
    # forgive me future me for i have sin
    if request.user.is_authenticated:
        return render(request, 'pages/index.html', context={}, status=200)
    return redirect(LOGIN_URL)

@api_view(['POST']) # http method the client === POST
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET']) # http method the client === GET
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET']) # http method the client === GET
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data)


""" def tweet_create_view_pure_django(request, *args, **kargs):
    
    Tweet creation view. Made purely in django
    Returns Json data
    
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={"form": form}, status=200) """

""" def tweet_list_view_pure_django(request, *args, **kwargs):
    
    REST API VIEW
    return json data
    
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
    data = {
        "isUser": False,
        "response": tweet_list
    }
    return JsonResponse(data) """

""" def tweet_detail_view_in_pure_django(request, tweet_id, *args, **kwargs):
    
    REST API VIEW
    Comsume by JavaScript or Swift or Java or IOS/Android
    return json data
    
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
    return JsonResponse(data, status=status) """