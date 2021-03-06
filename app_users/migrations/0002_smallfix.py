# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-30 12:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SmallFix',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation Date')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('title', models.CharField(blank=True, max_length=400, null=True, verbose_name='Name')),
                ('description', models.CharField(blank=True, max_length=400, null=True, verbose_name='Apellido')),
                ('url', models.CharField(blank=True, max_length=12, null=True, verbose_name='Phone Number')),
                ('status', models.IntegerField(choices=[(1, 'REQUESTED'), (2, 'APROVED'), (3, 'DONE'), (4, 'CANCELED')], default=1)),
                ('customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app_users.Customer')),
            ],
        ),
    ]
