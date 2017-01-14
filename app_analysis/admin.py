from django.contrib import admin
from .models import *


class PageInsightAdmin(admin.ModelAdmin):
    list_display = ['website', 'url', 'score']


class RuleResultAdmin(admin.ModelAdmin):
    list_display = ['title', 'impact']



admin.site.register(PageInsight, PageInsightAdmin)
admin.site.register(RuleResult, RuleResultAdmin)
