from django.conf.urls import url, include
from .views import *
from .views_api import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()
router.register(r'page-insights', PageInsightViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^page-speed/$', pageSpeedView, name='page-speed'),
]
