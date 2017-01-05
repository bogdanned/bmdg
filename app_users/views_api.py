from .serializers import *
from .models import *
import django_filters
from rest_framework import generics, filters, renderers, permissions, viewsets, status
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django_filters.rest_framework import DjangoFilterBackend


class IsOwnerFilterBackend(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """
    def filter_queryset(self, request, queryset, view):
        try:
            user = request.user
            customer = Customer.objects.get(user=user)
            queryset=queryset.filter(customer=customer)
        except:
            queryset = queryset

        return queryset


class CapsuleViewSet(viewsets.ModelViewSet):
    queryset = FixesCapsule.objects.all().order_by('created')
    serializer_class = CapsuleSerializer
    filter_backends = (DjangoFilterBackend, IsOwnerFilterBackend)
    filter_fields = ('customer','status')

    def create(self, request):
        """
        Create and return a new 'FixCapsule'.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = FixAttachment.objects.all().order_by('created')
    serializer_class = AttachmentSerializer


class SmallFixViewSet(viewsets.ModelViewSet):
    queryset = SmallFix.objects.all().order_by('created')
    serializer_class = SmallFixSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('status',)

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)

    def create(self, request):
        """
        Create and return a new 'SmalFix'.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
