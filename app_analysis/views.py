from django.shortcuts import render, redirect, reverse
from .services import *
from app_users.models import Customer, CustomerWebsite
from django.contrib import messages
from django.contrib.auth.decorators import login_required


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
