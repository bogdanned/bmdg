# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-04 15:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0010_auto_20170104_1053'),
    ]

    operations = [
        migrations.RenameField(
            model_name='smallfix',
            old_name='file',
            new_name='files',
        ),
    ]
