from __future__ import unicode_literals

from django.apps import AppConfig



class AppUsersConfig(AppConfig):
    name = 'app_users'
    verbose_name = 'Usuarios'

    def ready(self):
        from . import signals
