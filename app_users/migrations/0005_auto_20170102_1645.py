# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-02 16:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0004_auto_20170102_1625'),
    ]

    operations = [
        migrations.AlterField(
            model_name='smallfix',
            name='status',
            field=models.IntegerField(choices=[('REQUESTED', 'REQUESTED'), ('APROVED', 'APROVED'), ('DONE', 'DONE'), ('CANCELED', 'CANCELED')], default='REQUESTED'),
        ),
    ]