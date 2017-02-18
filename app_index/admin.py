from django.contrib import admin
from .models import *
# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "published"]
    list_editable = ["published"]



class SlideAdmin(admin.ModelAdmin):
    list_display = ["id", "heading", "published"]
    list_editable = ["heading", "published"]

admin.site.register(Slide, SlideAdmin)
admin.site.register(Project, ProjectAdmin)
