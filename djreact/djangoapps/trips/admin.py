# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from models import (
    Trip, Activity, Facility, Location, TripItinerary, TripSchedule, Host
)

admin.register(Trip)
admin.register(Activity)
admin.register(Facility)
admin.register(Location)
admin.register(TripItinerary)
admin.register(TripSchedule)
admin.register(Host)
