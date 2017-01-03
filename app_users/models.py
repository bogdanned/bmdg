from __future__ import unicode_literals
from django.db import models
from allauth import app_settings

# Create your models here.

class Customer(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    user = models.OneToOneField(app_settings.USER_MODEL,blank=True, null=False)
    name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Name')
    last_name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Apellido')
    phone_number = models.CharField(max_length = 12, null=True, blank = True, verbose_name = 'Phone Number')
    adress = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Adress')
    nif = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'ID Number(NIF/NIE)')

class FixesBatch(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    customer = models.ForeignKey(Customer)
    STATUS = (
        ('REQUESTED', ('REQUESTED')),
        ('APROVED', ('APROVED')),
        ('DONE', ('DONE')),
        ('CANCELED', ('CANCELED')),
    )
    status = models.CharField(max_length = 20, choices=STATUS, default='REQUESTED')


class SmallFix(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    customer = models.ForeignKey(Customer)
    batch = models.ForeignKey(FixesBatch, null=True)
    description = models.TextField(max_length = 5000, null=True, blank = True, verbose_name = 'Description')
    STATUS = (
        ('REQUESTED', ('REQUESTED')),
        ('APROVED', ('APROVED')),
        ('DONE', ('DONE')),
        ('CANCELED', ('CANCELED')),
    )
    status = models.CharField(max_length = 20, choices=STATUS, default='REQUESTED')
    credits = models.IntegerField(blank=True, null=True)

    def __unicode__(self):
        return self.description
