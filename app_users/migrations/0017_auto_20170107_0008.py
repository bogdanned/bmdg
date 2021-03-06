# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-07 00:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0016_auto_20170106_2004'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='credits',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='fixescapsule',
            name='status',
            field=models.CharField(choices=[('REQUESTED', 'REQUESTED'), ('APPROVED', 'APPROVED'), ('DEVELOPMENT', 'DEVELOPMENT'), ('DONE', 'DONE'), ('CANCELED', 'CANCELED')], default='REQUESTED', max_length=20),
        ),
    ]
