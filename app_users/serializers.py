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
            '__all__',
            )

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'id',
            'adress',
            'last_name',
            'name',
            'credits',
            'user',
            'image',
        )

class CapsuleFixSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = SmallFix
        fields = ('id',
                  'description',
                  'credits',
                  'files',
                  'status',
                  )
        read_only_fields = ('description',
                            'credits',
                            'files',
                            'status',
                            )


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
            )

    def create(self, validated_data):
        """
        Create and return a new 'SmalFix'.
        """
        user = validated_data.pop('user')
        customer = Customer.objects.get(user=user)
        validated_data['customer'] = customer
        return SmallFix.objects.create(**validated_data)
