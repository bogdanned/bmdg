from rest_framework import serializers
from .models import *
from datetime import datetime


class AttachmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FixAttachment
        fields = (
            'id',
            'created',
            'file',
            'filename',
        )


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'id',
            'adress',
            'last_name',
            'name',
        )

class CapsuleFixSerializer(serializers.ModelSerializer):
    files = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = SmallFix
        fields = ('created','updated','id', 'description', 'status', 'files',)


class CapsuleSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format="%B, %A %H:%M", read_only=True)
    customer = CustomerSerializer(read_only=True)
    fixes = CapsuleFixSerializer(many=True)

    class Meta:
        model = FixesCapsule
        fields = (
            'id',
            'created',
            'customer',
            'status',
            'fixes',
        )

    def create(self, validated_data):
        user = validated_data.pop('user')
        fixes = validated_data.pop('fixes')
        print(fixes)
        for fix in fixes:
            print(fix)
        customer = Customer.objects.get(user=user)
        validated_data['customer'] = customer
        return FixesCapsule.objects.create(**validated_data)



    def update(self, instance, validated_data):

        return instance


class SmallFixSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format="%B, %A %H:%M", read_only=True)
    files = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = SmallFix
        fields = (
            'id',
            'updated',
            'description',
            'status',
            'created',
            'files',
            )

    def create(self, validated_data):
        """
        Create and return a new 'SmalFix'.
        """
        user = validated_data.pop('user')
        customer = Customer.objects.get(user=user)
        validated_data['customer'] = customer
        return SmallFix.objects.create(**validated_data)
