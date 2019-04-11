import json

from django.db import models
from django.db.models import permalink


class Host(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    verified = models.BooleanField(default=False)


class Location(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=50, null=True, blank=True)
    coordinates = models.CharField(max_length=40, null=True, blank=True)


class Activity(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=50, null=True, blank=True)


class Facility(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=50, null=True, blank=True)


class Trip(models.Model):
    objects = models.Manager()

    name = models.CharField("Title", max_length=500, null=True, blank=True)
    slug = models.SlugField(max_length=50, null=True, blank=True)
    description = models.TextField("Description", null=True, blank=True)
    # meta includes tinyurl, poster
    _metadata = models.TextField(default='{}', null=True, blank=True)

    date_from = models.DateTimeField(null=True, blank=True)
    date_to = models.DateTimeField(null=True, blank=True)
    duration = models.SmallIntegerField(default=0, null=True, blank=True)
    price = models.SmallIntegerField(default=0, null=True, blank=True)

    starting_location = models.ForeignKey(Location)

    locations_included = models.ManyToManyField(Location)
    activities = models.ManyToManyField(Activity)
    facilities = models.ManyToManyField(Facility)

    cancelation_policy = models.TextField("Cancelation policy", null=True, blank=True)

    deleted = models.BooleanField(default=False)

    created_by = models.ForeignKey('auth.User', related_name="created_by_trips")
    host = models.ForeignKey(Host, related_name="host_trips")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        """Unicode representation of model instance"""
        return self.name

    class Meta:
        ordering = ['-created_at', '-id']

    @permalink
    def get_absolute_url(self):
        return ["view_trip", (), {'slug': self.slug}]

    @property
    def metadata(self):
        return json.loads(self._metadata)


class Itinerary(models.Model):
    trip = models.ForeignKey(Trip, related_name="trip_itinerary")
    day = models.SmallIntegerField(default=0)
    title = models.TextField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __unicode__(self):
        """Unicode representation of model instance"""
        return u"{0}-{1}".format(self.day, self.trip.name)

    class Meta:
        ordering = ['trip', 'day']
