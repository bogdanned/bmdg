from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^google/', pageSpeedView, name='google'),
]
