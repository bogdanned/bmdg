from django.contrib import admin
from .models import *


class PageInsightAdmin(admin.ModelAdmin):
    list_display = ['website', 'url', 'score']

admin.site.register(PageInsight, PageInsightAdmin)
