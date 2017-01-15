from rest_framework import serializers
from .models import *
from datetime import datetime
from django.contrib.auth.models import User


class RuleResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RuleResult
        fields = (
            'title',
            'impact',
            'description',
        )
        read_only_fields = (
            'title',
            'impact',
            'description',
        )


class PageInsightSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format="%B, %A %H:%M", read_only=True)
    rules = RuleResultSerializer(many=True)

    class Meta:
        model = PageInsight
        fields = (
            'id',
            'rules',
            'created',
            'website',
            'title',
            'score',
            'active',
        )
        read_only_fields = (
            'rules',
            'id',
            'website',
            'title',
            'score',
            'active',
        )
