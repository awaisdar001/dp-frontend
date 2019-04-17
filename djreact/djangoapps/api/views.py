# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import permissions, viewsets

from djangoapps.api.serializers import TripSerializer
from djangoapps.trips.models import Trip


class TripViewSet(viewsets.ModelViewSet):
    """Trip Viewset"""
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [
        permissions.AllowAny
    ]
