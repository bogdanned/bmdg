from __future__ import unicode_literals
from django.db import models
from allauth import app_settings
import os
# Create your models here.

class Customer(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    user = models.OneToOneField(app_settings.USER_MODEL,blank=True, null=False)
    name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Name')
    last_name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Apellido')
    phone_number = models.CharField(max_length = 12, null=True, blank = True, verbose_name = 'Phone Number')
    adress = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Adress')
    nif = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'ID Number(NIF/NIE)')
    image = models.ImageField(upload_to="images/", null=True, blank = True)
    def __unicode__(self):
        return self.user.email

class FixesCapsule(models.Model):
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


class FixAttachment(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank=False, null = False, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')

    def filename(self):
        return os.path.basename(self.file.name)

    def __unicode__(self):
        return os.path.basename(self.file.name)


class SmallFix(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    customer = models.ForeignKey(Customer)
    files = models.ManyToManyField(FixAttachment)
    capsule = models.ForeignKey(FixesCapsule, null=True, blank=True, related_name='fixes', on_delete=models.CASCADE)
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
