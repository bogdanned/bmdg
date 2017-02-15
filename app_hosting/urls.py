from django.conf.urls import url, include
from views import *



urlpatterns = [
    url(r'^managed-service/', pricingHosting, name="managed-service"),
]
