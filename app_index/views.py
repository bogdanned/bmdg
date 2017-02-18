from django.shortcuts import render
from .models import *
# Create your views here.


def indexView(request):
    projects = Project.objects.all().filter(published=True)
    slides = Slide.objects.all().filter(published=True)

    context = {
        "projects": projects,
        "slides": slides,
    }

    return render(request, "index.html", context)
