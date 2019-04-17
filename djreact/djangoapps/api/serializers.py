from django.contrib.auth.models import User
from rest_framework import serializers

from djangoapps.trips.models import (Activity, Facility, Host, Location, Trip,
                                     TripItinerary, TripSchedule)


class UserSerializer(serializers.ModelSerializer):
    """User Modal Serializer"""

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')


class LocationSerializer(serializers.ModelSerializer):
    """Location Modal Serializer"""

    class Meta:
        model = Location
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):
    """Facility Modal Serializer"""

    class Meta:
        model = Facility
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    """Activity Modal Serializer"""

    class Meta:
        model = Activity
        fields = '__all__'


class HostSerializer(serializers.ModelSerializer):
    """Host Modal Serializer"""

    class Meta:
        model = Host
        fields = '__all__'


class TripItinerarySerializer(serializers.ModelSerializer):
    """TripItinerary Modal Serializer"""

    class Meta:
        model = TripItinerary
        fields = '__all__'


class TripScheduleSerializer(serializers.ModelSerializer):
    """TripSchedule Modal Serializer"""

    class Meta:
        model = TripSchedule
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    """Trip Modal Serializer"""
    trip_schedule = TripScheduleSerializer(many=True)
    trip_itinerary = TripItinerarySerializer(many=True)

    activities = ActivitySerializer(many=True)
    cancelation_policy = serializers.CharField(read_only=True)
    facilities = FacilitySerializer(many=True)
    locations_included = LocationSerializer(many=True)
    starting_location = LocationSerializer()
    host = HostSerializer()
    created_by = UserSerializer()

    class Meta:
        exclude = ('_cancelation_policy',)
        model = Trip
