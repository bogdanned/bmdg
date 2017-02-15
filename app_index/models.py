from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Project(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creation Date')
    name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Project Name')
    customer_name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Customer Name')
    customer_website = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Customer Website')
    image_large = models.ImageField(upload_to="images/", null=True, blank = True)
    image_small = models.ImageField(upload_to="images/", null=True, blank = True)
    description = models.TextField(max_length = 5000, null=True, blank = True, verbose_name = 'Description')
    published = models.BooleanField(default=True, verbose_name="Publicar")

    def __unicode__(self):
        return "%s" % self.customer_name
