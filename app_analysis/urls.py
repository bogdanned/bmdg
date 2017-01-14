from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^page-speed/$', pageSpeedView, name='page-speed'),
]
