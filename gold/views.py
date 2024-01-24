from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
# Create your views here.

def index(request):
    indexTemplate = loader.get_template('gold/index.html')
    context = {
        
    }
    return HttpResponse(indexTemplate.render(context, request))

def plan(request):
    planTemplate = loader.get_template('gold/Plan.html')
    context={}
    return HttpResponse(planTemplate.render(context, request))