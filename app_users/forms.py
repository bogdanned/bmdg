from .models import *
from django import forms


class CustomerProfileForm(forms.ModelForm):

    class Meta:
        model = Customer
        fields = [
            'name',
            'last_name',
            'phone_number',
            'adress',
            'nif',
        ]


class FixAttachmentForm(forms.ModelForm):

    class Meta:
        model = FixAttachment
        fields = [
            'file',
        ]
