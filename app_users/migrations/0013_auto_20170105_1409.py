# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-05 14:09
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0012_auto_20170105_1230'),
    ]

    operations = [
        migrations.AlterField(
            model_name='smallfix',
            name='capsule',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fixes', to='app_users.FixesCapsule'),
        ),
    ]
