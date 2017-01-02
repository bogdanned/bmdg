from rest_framework import serializers
from .models import *


class SmallFixSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SmallFix
        fields = (
            'id',
            'created',
            'updated',
            'title',
            'description',
            'url',
            'status'
            )

    def create(self, validated_data):
        """
        Create and return a new 'SmalFix'.
        """
        user = validated_data.pop('user')
        customer = Customer.objects.get(user=user)
        validated_data['customer'] = customer
        return SmallFix.objects.create(**validated_data)
