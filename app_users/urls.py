from django.conf.urls import url, include
from .views import *
from .views_api import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'smallfixes', SmallFixViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^dashboard$', dashboard, name='dashboard'),
    url(r'^profile$', customerProfile, name='profile'),
    url(r'^fixes$', fixes, name='fixes'),
    url(r'^$', index, name='index'),
]
