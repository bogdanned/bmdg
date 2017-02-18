from django.shortcuts import render
from .models import *
from django.core.mail import send_mail

# Create your views here.


def indexView(request):
    projects = Project.objects.all().filter(published=True)
    slides = Slide.objects.all().filter(published=True)

    context = {
        "projects": projects,
        "slides": slides,
    }

    if request.method=="POST":
        data = request.POST
        print(data)
        send_mail(
            'Subject here',
            'Here is the message.',
            'bmdg@bmdg.es',
            ['bogdan@bmdg.es'],
            fail_silently=False,
        )


    return render(request, "index.html", context)
