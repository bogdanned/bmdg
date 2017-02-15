from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext as _
from django.utils import timezone
from app_users.models import CustomerWebsite
from django.contrib.auth.models import User
from django.db import models


class PageInsight(models.Model):
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    website = models.ForeignKey(CustomerWebsite, blank=True, null=True)
    responseCode = models.IntegerField(_('Response Code'), default=0)
    title = models.CharField(_('Page Title'), max_length=255)
    strategy = models.CharField(_('Strategy'), max_length=50)
    score = models.IntegerField(_('Score'), default=0)
    url = models.URLField(_('URL'))
    numberResources = models.IntegerField(_('Number of Resources'), default=0)
    numberHosts = models.IntegerField(_('Number of Hosts'), default=0)
    totalRequestBytes = models.IntegerField(_('Total Request Bytes'), default=0)
    numberStaticResources = models.IntegerField(_('Number of Static Resources'), default=0)
    htmlResponseBytes = models.IntegerField(_('HTML Response Bytes'), default=0)
    cssResponseBytes = models.IntegerField(_('CSS Response Bytes'), default=0)
    imageResponseBytes = models.IntegerField(_('Image Response Bytes'), default=0)
    javascriptResponseBytes = models.IntegerField(_('Javascript Response Bytes'), default=0)
    otherResponseBytes = models.IntegerField(_('Other Response Bytes'), default=0)
    numberJsResources = models.IntegerField(_('Number of JS Resources'), default=0)
    numberCssResources = models.IntegerField(_('Number of CSS Resources'), default=0)
    json = models.TextField(_('JSON Response'))
    active = models.BooleanField(_('Ensenar en el front office'), default=False)

    def __unicode__(self):
        return _('PageInights for %s on %s') % (self.url, self.created)


class RuleResult(models.Model):
    title = models.CharField(_('Page Title'), max_length=255)
    impact = models.FloatField(_('Impact'))
    description = models.TextField(_('Description'), blank=True, null=True)
    pageInsight = models.ForeignKey(PageInsight, related_name='rules')

    class Meta:
        verbose_name_plural = _('Rule Results')

    def __unicode__(self):
        return self.title


class Screenshot(models.Model):
    width = models.IntegerField(_('Width'))
    height = models.IntegerField(_('Height'))
    data = models.TextField(_('Image data'))
    mime_type = models.CharField(_('Mime Type'), max_length=255, blank=False, null=False)
    pageInsight = models.ForeignKey(PageInsight)

    def __unicode__(self):
        return _('Screenshot for %s') % self.pageInsight
