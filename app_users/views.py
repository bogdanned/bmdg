from django.shortcuts import render
from .models import *
from .forms import *
# Create your views here.


def index(request):

    context = {}

    return render(request, "front-office/index.html", context)


def dashboard(request):
    context = {}


    return render(request, "backoffice/dashboard.html", context)


def fixes(request):
    context = {}


    return render(request, "backoffice/fixes.html", context)


def customerProfile(request):
    form = CustomerProfileForm()
    context = {
        'form': form,
    }

    return render(request, "backoffice/profile.html", context)


def addFixes(request):
    if request.method == "POST":

        context = {}


    return render(request, "backoffice/fixes.html", context)
