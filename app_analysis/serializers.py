from rest_framework import serializers
from .models import *
from datetime import datetime
from django.contrib.auth.models import User


class PageInsightSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format="%B, %A %H:%M", read_only=True)

    class Meta:
        model = PageInsight
        fields = (
            'id',
            'created',
            'website',
            'title',
            'score',
            'active'
        )
        read_only_fields = (
            'id',
            'website',
            'title',
            'score',
            'active'
        )
