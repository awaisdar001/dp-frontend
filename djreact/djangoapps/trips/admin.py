# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from models import (
    Trip, Activity, Facility, Location, TripItinerary, TripSchedule, Host
)

admin.site.register(Trip)
admin.site.register(Activity)
admin.site.register(Facility)
admin.site.register(Location)
admin.site.register(TripItinerary)
admin.site.register(TripSchedule)
admin.site.register(Host)
