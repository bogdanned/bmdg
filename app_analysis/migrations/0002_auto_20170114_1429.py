# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-14 14:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app_users', '0029_auto_20170114_1420'),
        ('app_analysis', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PageInsight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation Date')),
                ('responseCode', models.IntegerField(default=0, verbose_name='Response Code')),
                ('title', models.CharField(max_length=255, verbose_name='Page Title')),
                ('strategy', models.CharField(max_length=50, verbose_name='Strategy')),
                ('score', models.IntegerField(default=0, verbose_name='Score')),
                ('url', models.URLField(verbose_name='URL')),
                ('numberResources', models.IntegerField(default=0, verbose_name='Number of Resources')),
                ('numberHosts', models.IntegerField(default=0, verbose_name='Number of Hosts')),
                ('totalRequestBytes', models.IntegerField(default=0, verbose_name='Total Request Bytes')),
                ('numberStaticResources', models.IntegerField(default=0, verbose_name='Number of Static Resources')),
                ('htmlResponseBytes', models.IntegerField(default=0, verbose_name='HTML Response Bytes')),
                ('cssResponseBytes', models.IntegerField(default=0, verbose_name='CSS Response Bytes')),
                ('imageResponseBytes', models.IntegerField(default=0, verbose_name='Image Response Bytes')),
                ('javascriptResponseBytes', models.IntegerField(default=0, verbose_name='Javascript Response Bytes')),
                ('otherResponseBytes', models.IntegerField(default=0, verbose_name='Other Response Bytes')),
                ('numberJsResources', models.IntegerField(default=0, verbose_name='Number of JS Resources')),
                ('numberCssResources', models.IntegerField(default=0, verbose_name='Number of CSS Resources')),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created Date')),
                ('json', models.TextField(verbose_name='JSON Response')),
                ('website', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_users.CustomerWebsite')),
            ],
        ),
        migrations.CreateModel(
            name='RuleResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Page Title')),
                ('impact', models.FloatField(verbose_name='Impact')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('pageInsight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_analysis.PageInsight')),
            ],
            options={
                'verbose_name_plural': 'Rule Results',
            },
        ),
        migrations.CreateModel(
            name='Screenshot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('width', models.IntegerField(verbose_name='Width')),
                ('height', models.IntegerField(verbose_name='Height')),
                ('data', models.TextField(verbose_name='Image data')),
                ('mime_type', models.CharField(max_length=255, verbose_name='Mime Type')),
                ('pageInsight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_analysis.PageInsight')),
            ],
        ),
        migrations.RemoveField(
            model_name='googlepagespeedanalysis',
            name='website',
        ),
        migrations.DeleteModel(
            name='GooglePageSpeedAnalysis',
        ),
    ]
