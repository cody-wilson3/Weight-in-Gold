from django.db import models
#this model takes in the inputted value, and to and from units


class Conversion(models.Model):
    fromUnit = models.CharField(max_length=10)
    toUnit = models.CharField(max_length=10)
    conversionNumber = models.FloatField()