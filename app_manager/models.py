from __future__ import unicode_literals
from app_users.models import Customer, CustomerWebsite
from django.db import models

# Create your models here.


class CustomerProject(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Created')
    update = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    name = models.CharField(max_length = 400, null=True, blank = True, verbose_name = 'Name')
    customer = models.ForeignKey(Customer, blank=True, null=True, verbose_name = 'Customer')
    customerWebsite = models.ForeignKey(CustomerWebsite, null=True, blank = True, verbose_name = 'CustomerWebsite')

    @property
    def ongoing_tasks(self):
        verbose_name = 'OnGoin Tasks'
        return CustomerTask.objects.filter(status=1, project=self).count()

    def __unicode__(self):
        return self.name


class CustomerTask(models.Model):
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Created')
    update = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Updated')
    deadline = models.DateTimeField(blank=True, null=True, verbose_name='Deadline')
    STATUS = (
        (1, 'OnGoing'),
        (2, 'Completed'),
    )
    status = models.IntegerField(blank=True, null=True, choices=STATUS,verbose_name = 'Status')
    task = models.TextField(max_length=4000, null=True, blank = True, verbose_name = 'Task')
    project = models.ForeignKey(CustomerProject, blank=False, null=True)


    @property
    def customer_name(self):
        verbose_name = 'Customer'
        try:
            name = self.project.customer.name
        except:
            name = None
        return None
