from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.template import loader
from django.urls import reverse
from .models import Conversion


# Create your views here.
def convert(request):
    fromVal = request.GET.get("from")
    initValue = request.GET.get("value")
    toUnit = request.GET.get("to")

    possibleUnits = ["T", "g", "kg", "t_oz", "lb", "oz"]
    if ((fromVal not in possibleUnits) | (toUnit not in possibleUnits) | ( not float(initValue.isdigit()))):
        return JsonResponse({"Error": "units must be either T, g, kg, t_oz, lb, or oz and the Value must be a number."})

    fromtoTroy = Conversion.objects.filter(fromUnit=fromVal)[0]
    troyToTo = Conversion.objects.filter(fromUnit=toUnit)[0]
    

    wantedVal = float(initValue) * float(fromtoTroy.conversionNumber) / float(troyToTo.conversionNumber)
    returnDict = {
        "units" : toUnit,
        "value" : wantedVal,
    }
    return JsonResponse(returnDict)