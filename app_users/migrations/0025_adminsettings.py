# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-11 10:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0024_stripetransaction_transaction'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation Date')),
                ('euro_per_credit', models.IntegerField(blank=True, null=True, verbose_name='Euro per Credit')),
            ],
        ),
    ]