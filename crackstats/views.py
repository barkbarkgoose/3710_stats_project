from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from passwords_app.python_source import password_stats
import pdb
import json #used in HttpResponse as "json.dumps({})"
# Create your views here.
def index(request):
    # pdb.set_trace()
    if request.GET:
        password = request.GET['password']
        # return JsonResponse({"password": password})
        stats = password_stats.calculate_complexity(password)
        hash = password_stats.create_hash(password)
        # return HttpResponse(
        #     json.dumps({"stats":stats, 'hash':hash}),
        #     content_type="application/json",
        # )
        return JsonResponse({"stats":stats, 'hash':hash})
        # pdb.set_trace()


    return render(request, "crackstats/index.html")
