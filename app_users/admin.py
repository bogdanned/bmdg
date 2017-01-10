from django.contrib import admin
from .models import *
import nested_admin


# Register your models here.

class StripeTransactionAdmin(admin.ModelAdmin):
    fields = ['created', 'updated', 'idempotency_key']
    readonly_fields = ['created', 'updated', 'idempotency_key']

class FixAttachmentAdmin(admin.ModelAdmin):
    fields = ['created', 'file', 'file_link']
    readonly_fields = ['file_link','created']


class SmallFixAdmin(admin.ModelAdmin):
    list_display = ['customer', 'created', 'status', 'to_dev']
    list_editable = ['to_dev']


class InlineAttachmentAdmin(nested_admin.NestedStackedInline):
    model = SmallFix.files.through
    extra = 0


class InlineCapsuleSmallFixAdmin(nested_admin.NestedTabularInline):
    model = SmallFix
    fields = ['description',
              'feedback',
              'status',
              'credits',
              'to_dev',]

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
                       'progress',]
    list_filter = ['customer', 'status']
    list_editable = ['status']

admin.site.register(SmallFix, SmallFixAdmin)
admin.site.register(FixAttachment, FixAttachmentAdmin)
admin.site.register(FixesCapsule, FixesCapsuleAdmin)
admin.site.register(Customer)
admin.site.register(StripeTransaction, StripeTransactionAdmin)
