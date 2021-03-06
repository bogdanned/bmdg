# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-14 14:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app_users', '0029_auto_20170114_1420'),
    ]

    operations = [
        migrations.CreateModel(
            name='GooglePageSpeedAnalysis',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation Date')),
                ('website', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_users.CustomerWebsite')),
            ],
        ),
    ]
