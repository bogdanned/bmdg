from django.shortcuts import render, redirect, reverse
from .services import *
from app_users.models import Customer, CustomerWebsite
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from oauth2client.contrib.django_util.models import CredentialsField
from oauth2client.contrib.django_util.storage import DjangoORMStorage


@login_required
def pageSpeedView(request):
    """
    Creates a PageInsight Object From Django Customer Admin
    """
    if request.method == "POST":
        customer_pk = request.POST['customer_pk']
        customer = Customer.objects.get(pk=customer_pk)
        result = runPageSpeedAnalysis(customer)
        messages.add_message(request, messages.INFO, 'Analysis de pagina realizado correctamente.')
        """
        except Exception as inst:
            print(inst)
            messages.add_message(request, messages.ERROR, 'Hubo un error el el proceso.')
        """
        return redirect(reverse('admin:app_users_customer_change', args=[customer.pk,]))


import os
import logging
import httplib2
from apiclient.discovery import build
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseRedirect
from django.shortcuts import render
from oauth2client.contrib import xsrfutil
from django.conf import settings


CLIENT_SECRETS = os.path.join(os.path.dirname(__file__), '..', 'client_secrets.json')

FLOW = flow_from_clientsecrets(
    CLIENT_SECRETS,
    scope='https://www.googleapis.com/auth/plus.me',
    redirect_uri='http://localhost:8000/oauth2callback')


@login_required
def index(request):
  storage = Storage(CredentialsModel, 'id', request.user, 'credential')
  credential = storage.get()
  if credential is None or credential.invalid == True:
    FLOW.params['state'] = xsrfutil.generate_token(settings.SECRET_KEY,
                                                   request.user)
    authorize_url = FLOW.step1_get_authorize_url()
    return HttpResponseRedirect(authorize_url)
  else:
    http = httplib2.Http()
    http = credential.authorize(http)
    service = build("plus", "v1", http=http)
    activities = service.activities()
    activitylist = activities.list(collection='public',
                                   userId='me').execute()
    logging.info(activitylist)

    return render(request, 'plus/welcome.html', {
                'activitylist': activitylist,
                })


@login_required
def auth_return(request):
  if not xsrfutil.validate_token(settings.SECRET_KEY, request.REQUEST['state'],
                                 request.user):
    return  HttpResponseBadRequest()
  credential = FLOW.step2_exchange(request.REQUEST)
  storage = Storage(CredentialsModel, 'id', request.user, 'credential')
  storage.put(credential)
  return HttpResponseRedirect("/")
