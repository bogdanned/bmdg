from __future__ import unicode_literals
from django.db import models
from allauth import app_settings
from django.utils.safestring import mark_safe
from django.utils.translation import ugettext_lazy as _
import os
import uuid
import datetime
from django.utils import timezone
from django.conf import settings
# Create your models here.


class AdminSettings(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    euro_per_credit = models.IntegerField(blank = True, null = True, verbose_name = 'Euro per Credit')

    def __unicode__(self):
        return "E/C: %s" % self.euro_per_credit

class Customer(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    user = models.OneToOneField(app_settings.USER_MODEL,blank=True, null=False)
    name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Name')
    last_name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Apellido')
    phone_number = models.CharField(max_length = 12, null=True, blank = True, verbose_name = 'Phone Number')
    adress = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Adress')
    nif = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'ID Number(NIF/NIE)')
    image = models.ImageField(upload_to="images/", null=True, blank = True)
    credits = models.IntegerField(blank=True, default=0)

    def __unicode__(self):
        return self.user.email


class CustomerWallet(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    customer = models.ForeignKey(Customer, blank=False, null=False)
    credits = models.IntegerField(blank=True, default=0)

    def __unicode__(self):
        return "Wallet: %s" % self.customer.name


class CustomerTransaction(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    credits = models.IntegerField(blank=True, default=0)
    wallet = models.ForeignKey(CustomerWallet, blank=False, null=False)

    def __unicode__(self):
        return self.user.email



class FixesCapsule(models.Model):
    class Meta:
        verbose_name = _("Capsula")
        verbose_name_plural = _("Capsulas")

    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    customer = models.ForeignKey(Customer)
    STATUS = (
        ('REQUESTED', ('REQUESTED')),
        ('APPROVED', ('APPROVED')),
        ('DEVELOPMENT', ('DEVELOPMENT')),
        ('DONE', ('DONE')),
        ('CANCELED', ('CANCELED')),
    )
    status = models.CharField(max_length = 20, choices=STATUS, default='REQUESTED')
    dev_entry = models.DateTimeField(blank = True, null = True, verbose_name = 'Dev Start')
    dev_exit = models.DateTimeField(blank = True, null = True, verbose_name = 'Dev Exit')

    #  this is not needed if small_image is created at set_image
    def save(self, *args, **kwargs):
        if getattr(self, 'status_changed', True):
            if self.status == 'DEVELOPMENT':
                print("changed to dev development")
                self.dev_entry = timezone.now();
                self.dev_exit = timezone.now() + datetime.timedelta(days=settings.DELIVERY_DAYS)
        super(FixesCapsule, self).save(*args, **kwargs)

    @property
    def fixes_nr(self):
        return SmallFix.objects.all().filter(capsule=self).count()


    @property
    def progress(self):
        now = timezone.now()
        if self.dev_exit:
            delivery_left = self.dev_exit - now
            delivery_left_seconds = delivery_left.total_seconds()
            delivery_seconds = datetime.timedelta(days=settings.DELIVERY_DAYS).total_seconds()
            progress = 100 - ((delivery_left_seconds/delivery_seconds)*100)
            if progress < 5:
                progress = 5
        else:
            progress = 0
        return progress


class FixAttachment(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank=False, null = False, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')

    @property
    def file_link(self):
        if self.file:
            url = "<a href='%s'>Download</a>" % (self.file.url,)
            safe_html = mark_safe(url)
            return safe_html
        else:
            return "No attachment"

    def file_name(self):
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
    feedback = models.TextField(max_length = 5000, null=True, blank = True, verbose_name = _('Valoracion Technica'))
    STATUS = (
        ('REQUESTED', ('REQUESTED')),
        ('ASSIGNED', ('ASSIGNED')),
        ('APROVED', ('APROVED')),
        ('DONE', ('DONE')),
        ('CANCELED', ('CANCELED')),
    )
    status = models.CharField(max_length = 20, choices=STATUS, default='REQUESTED')
    credits = models.IntegerField(blank=True, null=True)
    to_dev = models.BooleanField(blank=True, default=True)

    def __unicode__(self):
        return self.description



class StripeTransaction(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = True, verbose_name = 'Creation Date')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, verbose_name = 'Updated')
    idempotency_key = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction = models.ForeignKey(CustomerTransaction, blank=False, null=False)
