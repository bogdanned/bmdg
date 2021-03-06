# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-18 15:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_index', '0003_auto_20170215_2007'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slide',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation Date')),
                ('heading', models.CharField(blank=True, max_length=1000, null=True, verbose_name='heading')),
                ('sub_heading', models.CharField(blank=True, max_length=1000, null=True, verbose_name='Sub Heading')),
                ('image_large', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('link', models.CharField(blank=True, max_length=400, null=True, verbose_name='Link')),
            ],
        ),
        migrations.AlterModelOptions(
            name='project',
            options={'verbose_name': 'Proyecto BMDG'},
        ),
    ]
