from django.contrib import admin
from .models import *
from app_analysis.models import *
import nested_admin


# Register your models here.

class StripeTransactionAdmin(admin.ModelAdmin):
    fields = ['created', 'updated', 'idempotency_key']
    readonly_fields = ['created', 'updated', 'idempotency_key']


class FixAttachmentAdmin(admin.ModelAdmin):
    fields = ['created', 'file', 'file_link']
    readonly_fields = ['file_link', 'created']
    list_display = ['created', 'file_name']


class SmallFixAdmin(admin.ModelAdmin):
    list_display = ['customer', 'description', 'created', 'status', 'to_dev']
    list_editable = ['status', 'to_dev']
    readonly_fields = ['created', 'updated']
    list_filter = ['customer']


class InlineAttachmentAdmin(nested_admin.NestedStackedInline):
    model = SmallFix.files.through
    extra = 0


class InlineCapsuleSmallFixAdmin(nested_admin.NestedTabularInline):
    model = SmallFix
    fields = ['description',
              'feedback',
              'status',
              'credits',
              'to_dev',
              'customer']

    extra = 0
    inlines = [
        InlineAttachmentAdmin,
    ]


class FixesCapsuleAdmin(nested_admin.NestedModelAdmin):
    list_display = ['customer',
                    'status',
                    'fixes_nr',
                    'created',
                    'progress',
                    ]
    inlines = [
        InlineCapsuleSmallFixAdmin,
    ]
    fields = ['created',
              'updated',
              'customer',
              'status',
              'fixes_nr',
              'dev_entry',
              'dev_exit',
              'progress',
              ]
    readonly_fields = ['created',
                       'updated',
                       'fixes_nr',
                       'progress',
                       'progress',
                       ]
    list_filter = ['customer', 'status']
    list_editable = ['status']


class RuleResultInline(nested_admin.NestedTabularInline):
    model = RuleResult
    readonly_fields = ['title', 'impact', 'description']
    extra = 0
    classes = 'collapse'

class PageSpeedInsightInline(nested_admin.NestedTabularInline):
    model = PageInsight
    extra = 0
    inlines = [RuleResultInline]
    readonly_fields=['created',
                     'score',
                     'title',
                     'responseCode',
                     'url',
                     'numberResources',
                     'numberHosts',
                     'totalRequestBytes',
                     'numberStaticResources',
                     'htmlResponseBytes',
                     'cssResponseBytes',
                     'imageResponseBytes',
                     'javascriptResponseBytes',
                     'otherResponseBytes',
                     'numberJsResources',
                     'numberCssResources',
                     ]
    exclude = ['json','updated','strategy']
    classes = 'collapse'


class CustomerWebsiteInline(nested_admin.NestedTabularInline):
    model = CustomerWebsite
    fields = ['url',]
    extra = 0
    inlines = [PageSpeedInsightInline]


class CustomerAdmin(nested_admin.NestedModelAdmin):
    list_display = ['name','website_url']
    inlines = [CustomerWebsiteInline]



admin.site.register(SmallFix, SmallFixAdmin)
admin.site.register(FixAttachment, FixAttachmentAdmin)
admin.site.register(FixesCapsule, FixesCapsuleAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(StripeTransaction, StripeTransactionAdmin)
admin.site.register(AdminSettings)
admin.site.register(CustomerWebsite)
