from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^dashboard$', dashboard, name='dashboard'),
    url(r'^profile$', customerProfile, name='profile'),
    url(r'^fixes$', fixes, name='fixes'),
    url(r'^$', index, name='index'),
]
