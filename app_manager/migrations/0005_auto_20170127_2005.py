# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-27 20:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_manager', '0004_auto_20170127_2004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customertask',
            name='project',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app_manager.CustomerProject'),
        ),
        migrations.AlterField(
            model_name='customertask',
            name='task',
            field=models.TextField(blank=True, max_length=4000, null=True, verbose_name='Tax'),
        ),
    ]