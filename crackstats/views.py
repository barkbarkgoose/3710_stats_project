from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "crackstats/index.html")
