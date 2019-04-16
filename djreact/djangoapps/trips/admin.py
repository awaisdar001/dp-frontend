# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from models import (Activity, Facility, Host, Location, Trip, TripItinerary,
                    TripSchedule)


class TripScheduleAdminInline(admin.TabularInline):
    """Trip schedule inline modal admin"""
    model = TripSchedule
    extra = 0


class TripItineraryAdminInline(admin.StackedInline):
    """Trip itinerary inline modal admin"""
    model = TripItinerary
    extra = 0


class TripAdmin(admin.ModelAdmin):
    """Trip modal admin configuration"""
    inlines = [TripItineraryAdminInline, TripScheduleAdminInline]
    prepopulated_fields = {'slug': ('name',)}
    list_display = (
        'name', 'slug', 'price'
    )
    list_filter = ('starting_location',)
    search_fields = ['name', 'description', 'locations_included']


class ActivityAdmin(admin.ModelAdmin):
    """Activity modal admin configuration"""
    prepopulated_fields = {'slug': ('name',)}
    list_display = (
        'name', 'slug',
    )


class FacilityAdmin(admin.ModelAdmin):
    """Facility modal admin configuration"""
    prepopulated_fields = {'slug': ('name',)}
    list_display = (
        'name', 'slug',
    )


class LocationAdmin(admin.ModelAdmin):
    """Location modal admin configuration"""
    prepopulated_fields = {'slug': ('name',)}
    list_display = (
        'name', 'slug',
    )


class TripItineraryAdmin(admin.ModelAdmin):
    """Trip itinerary modal admin configuration"""
    list_display = ('trip', 'description')
    list_filter = ('trip',)
    search_fields = ['trip']


class TripScheduleAdmin(admin.ModelAdmin):
    """Trip schedule admin configuration"""
    list_display = ('trip', 'date_from')
    list_filter = ('date_from',)
    search_fields = ['trip']


class HostAdmin(admin.ModelAdmin):
    """Host modal admin configuration"""
    list_display = (
        'name', 'description', 'verified'
    )
    list_filter = ('verified',)
    search_fields = ['name', 'description']


admin.site.register(Trip, TripAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(Facility, FacilityAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(TripItinerary, TripItineraryAdmin)
admin.site.register(TripSchedule, TripScheduleAdmin)
admin.site.register(Host, HostAdmin)
