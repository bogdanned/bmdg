from django.contrib import admin
from .models import *
import nested_admin


class AdminCustomerTask(nested_admin.NestedModelAdmin):
    list_display = ['project','status','task','customer_name','deadline']
    list_editable = ['status','task']
    filter = ['project']
    search_fields = ['name']


class InlineAdminCustomerTask(nested_admin.NestedTabularInline):
    model = CustomerTask
    extra = 1

class AdminCustomerProject(nested_admin.NestedModelAdmin):
    list_display = ['name',
                    'customer',
                    'ongoing_tasks',
                    ]
    inlines = [InlineAdminCustomerTask]


admin.site.register(CustomerTask, AdminCustomerTask)
admin.site.register(CustomerProject, AdminCustomerProject)
