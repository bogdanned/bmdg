from allauth.account.adapter import DefaultAccountAdapter
from django.urls import reverse


# The Register form creates the profiles !!! Before the adapter does!!
class BmdgAdapter(DefaultAccountAdapter):

    # Redirect after succesfull login
    def get_login_redirect_url(self, request):
        return reverse('dashboard')
