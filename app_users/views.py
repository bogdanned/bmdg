from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from .models import *
from .forms import *
import stripe
import json

# Create your views here.
stripe.api_key = settings.STRIPE_API_KEY


def index(request):

    context = {}

    return render(request, "front-office/index.html", context)


@login_required
def dashboard(request):
    context = {}

    return render(request, "backoffice/base.html", context)


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

    context = {}

    return render(request, "backoffice/fixes.html", context)


@login_required
def capsulesView(request):

    context = {}

    return render(request, "backoffice/capsules.html", context)


@login_required
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


@login_required
def getPublishableKey(request):

    key = settings.STRIPE_PUBLISHABLE_KEY

    return JsonResponse({'key': key})


@login_required
def chargePaymentToken(request):
    if request.method == "POST":
        transaction = StripeTransaction()
        transaction.save()
        data = request.body
        data = json.loads(request.body)
        token = data["token"]
        amount = data["amount"]
        if amount > 50:
            try:
                res = stripe.Charge.create(
                  amount=str(amount),
                  currency="eur",
                  description="BMDG Partners",
                  source=token,  # obtained with Stripe.js
                  idempotency_key=str(transaction.idempotency_key),
                )
                return JsonResponse({'success': True})
            except:
                return JsonResponse({'success': False})
        else:
            return JsonResponse({'success': False})
