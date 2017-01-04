from .serializers import *
from .models import *
import django_filters
from rest_framework import generics, filters, renderers, permissions, viewsets, status
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.reverse import reverse

class AttachmentsViewSet(viewsets.ModelViewSet):
    queryset = FixAttachment.objects.all().order_by('created')
    serializer_class = AttachmentSerializer


class SmallFixViewSet(viewsets.ModelViewSet):
    queryset = SmallFix.objects.all().order_by('created')
    serializer_class = SmallFixSerializer

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
