from rest_framework import serializers
from .models import *
from datetime import datetime



class SmallFixSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format="%B, %A %H:%M", read_only=True)

    class Meta:
        model = SmallFix
        fields = (
            'id',
            'updated',
            'description',
            'status',
            'created',
            )

    def create(self, validated_data):
        """
        Create and return a new 'SmalFix'.
        """
        user = validated_data.pop('user')
        customer = Customer.objects.get(user=user)
        validated_data['customer'] = customer
        return SmallFix.objects.create(**validated_data)
