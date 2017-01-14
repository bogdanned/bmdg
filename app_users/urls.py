from django.conf.urls import url, include
from .views import *
from .views_api import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()
router.register(r'smallfixes', SmallFixViewSet)
router.register(r'smallfixes/attachments', AttachmentViewSet)
router.register(r'capsules', CapsuleViewSet)
router.register(r'customer', CustomerViewSet)
router.register(r'customer-website', CustomerWebsiteViewSet)
router.register(r'user', UserViewSet)


payment_patterns = [
    url(r'^charge$', chargePaymentToken, name="stripe-payment"),
    url(r'^get-key$', getPublishableKey, name="stripe-key"),

    #url(r'^transaction$', createTransaction, name="braintree-transaction"),
]


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^dashboard$', dashboard, name='dashboard'),
    url(r'^profile$', customerProfile, name='profile'),
    url(r'^fixes$', fixes, name='fixes'),
    url(r'^capsules$', capsulesView, name='capsules'),
    url(r'^$', index, name='index'),
    url(r'^attachments/add$', addFixAttachement, name='attachment-add'),
    url(r'^payment/', include(payment_patterns)),
]
