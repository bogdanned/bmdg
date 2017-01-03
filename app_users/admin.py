from django.contrib import admin
from .models import *


# Register your models here.


class SmallFixAdmin(admin.ModelAdmin):
    list_display=['customer','created', 'status']


admin.site.register(SmallFix, SmallFixAdmin)
admin.site.register(Customer)
