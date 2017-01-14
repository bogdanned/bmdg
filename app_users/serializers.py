from rest_framework import serializers
from .models import *
from datetime import datetime
from django.contrib.auth.models import User


class AttachmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FixAttachment
        fields = (
            'id',
            'created',
            'file',
            'file_name',
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'date_joined',
            'email',
            )


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'id',
            'adress',
            'name',
            'email',
            'nif',
            'credits',
            'user',
            'image',
            'customerwebsite',
        )
        read_only_fields = ('user','image')

class CustomerWebsiteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomerWebsite
        fields = (
            'created',
            'updated',
            'url',
        )
        read_only_fields = ('user','image')


class CapsuleFixSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = SmallFix
        fields = ('id',
                  'description',
                  'credits',
                  'files',
                  'status',
                  'to_dev'
                  )
        read_only_fields = ('description',
                            'credits',
                            'files',
                            'status',
                            'to_dev'
                            )


class CapsuleSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format="%B, %A %H:%M", read_only=True)
    customer = CustomerSerializer(read_only=True)
    fixes = CapsuleFixSerializer(many=True)
    progress = serializers.DecimalField(max_digits=3, decimal_places=0 )

    class Meta:
        model = FixesCapsule
        fields = (
            'id',
            'created',
            'customer',
            'status',
            'fixes',
            'dev_exit',
            'progress',
        )
        read_only_fields = (
            'dev_exit',
            'progress',
        )

    def create(self, validated_data):
        user = validated_data.pop('user')
        fizes = validated_data.pop('fixes')
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
            'to_dev',
            )

    def create(self, validated_data):
        """
        Create and return a new 'SmalFix'.
        """
        user = validated_data.pop('user')
        customer = Customer.objects.get(user=user)
        validated_data['customer'] = customer
        return SmallFix.objects.create(**validated_data)
