from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from .models import *
from .forms import *

# Create your views here.


def index(request):

    context = {}

    return render(request, "front-office/index.html", context)

@login_required
def dashboard(request):
    context = {}


    return render(request, "backoffice/dashboard.html", context)


@login_required
def fixes(request):
    context = {}


    return render(request, "backoffice/fixes.html", context)


@login_required
def customerProfile(request):
    form = CustomerProfileForm()
    context = {
        'form': form,
    }

    return render(request, "backoffice/profile.html", context)


@login_required
def addFixes(request):
    if request.method == "POST":

        context = {}


    return render(request, "backoffice/fixes.html", context)



def addFixAttachement(request):
    if request.method == "POST":
        fix_pk = request.POST.get("fix_id")
        fix = SmallFix.objects.get(pk=fix_pk)
        for file in request.FILES:
            attachment = FixAttachment(file=file)
            attachment.save()
            fix.files.add(attachment)
        fix.save()
        return JsonResponse({'succes':True})


    return HttpResponse('test')
