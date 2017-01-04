from django.conf.urls import url, include
from .views import *
from .views_api import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'smallfixes', SmallFixViewSet)
router.register(r'smallfixes/attachments', AttachmentsViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^dashboard$', dashboard, name='dashboard'),
    url(r'^profile$', customerProfile, name='profile'),
    url(r'^fixes$', fixes, name='fixes'),
    url(r'^$', index, name='index'),
    url(r'^attachments/add$', addFixAttachement, name='attachment-add'),
]
