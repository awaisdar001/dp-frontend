# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import permissions, viewsets

from djangoapps.api import serializers
from djangoapps.trips.models import Trip


class TripViewSet(viewsets.ReadOnlyModelViewSet):
    """Trip Viewset"""
    queryset = Trip.objects.all()
    serializer_class = serializers.TripDetailSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_serializer_class(self):
        """
        Overridden method which the serializer.

        Use different serializer for list and retrieve requests.
        """
        if self.action == 'list':
            return serializers.TripListSerializer
        if self.action == 'retrieve':
            return serializers.TripDetailSerializer
        return serializers.TripListSerializer
