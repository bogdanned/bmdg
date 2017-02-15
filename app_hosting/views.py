from django.shortcuts import render

# Create your views here.


def pricingHosting(request):


    return render(request, 'app_hosting/pricing.html', {})
