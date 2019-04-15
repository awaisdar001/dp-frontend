# -*- coding: utf-8 -*-
from django.test import TestCase

from djangoapps.trips.models import (
    Host, Location, Activity, Facility
)


class TestHost(TestCase):
    """
    Test Suite for verifying various operations on Host model.
    """

    def setUp(self):
        self.host = Host(name="Arbisoft")
        self.host.save()

    def test_create_host(self):
        """
        Test that Host object creates successfully with required
        and optional fields.
        """
        # Successful Save will create id
        self.assertIsNotNone(self.host.id)
        self.assertIsNone(self.host.description)
        self.assertFalse(self.host.verified)

        # Adding Optional Fields
        self.host.description = "Travel Company"
        self.host.verified = True
        self.host.save()
        self.assertEqual(self.host.verified, True)
        self.assertIsNotNone(self.host.description)

    def test_update_host(self):
        """
        Test that updating the Host object works with changes
        reflected after the save
        """
        prev_description = self.host.description
        self.host.verified = True
        self.host.description = "Software Company"
        self.host.save()
        updated_host = Host.objects.filter(name=self.host.name)[0]
        self.assertNotEqual(prev_description, updated_host.description)

    def test_delete_host(self):
        """
        Test deleting an object works and object is not
        accessible after deletion
        """
        host_name = self.host.name
        self.host.delete()
        with self.assertRaises(Host.DoesNotExist):
            Host.objects.get(name=host_name)


class TestLocation(TestCase):
    """
    Test Suite to verify Location model w.r.t CRUD Operations.
    """

    def setUp(self):
        self.location = Location(name="Lahore")
        self.location.save()

    def test_create_location(self):
        """
        Test location object is created successfully after save
        """
        self.assertIsNotNone(self.location.id)

    def test_update_location(self):
        """
        Test location objects are persisted after update.
        """
        self.assertIsNone(self.location.coordinates)
        self.location.coordinates = "-95, 45"
        self.location.save()
        updated_location = Location.objects.filter(name=self.location.name)[0]
        self.assertIsNotNone(updated_location.coordinates)

    def test_delete_location(self):
        """
        Test location objects are no longer persisted after delete.
        """
        location_name = self.location.name
        self.location.delete()
        with self.assertRaises(Location.DoesNotExist):
            Location.objects.get(name=location_name)


class TestActivity(TestCase):
    """
    To test CRUD operations on Activity model.
    """

    def setUp(self):
        self.activity = Activity(name="Snow Fights")
        self.activity.save()

    def test_create_activity(self):
        """
        Test activity is created successfully after save operation.
        """
        self.assertIsNotNone(self.activity.id)

    def test_update_activity(self):
        """
        Test activity object updates are persisted successfully after save.
        """
        id = self.activity.id
        self.activity.name = "Pokemon Fight"
        self.activity.save()
        updated_activity = Activity.objects.filter(id=id)[0]
        self.assertEqual("Pokemon Fight", updated_activity.name)

    def test_delete_activity(self):
        """
        Test the activity object is not longer persisted after delete.
        """
        self.assertEqual(1, len(Activity.objects.all()))
        self.activity.delete()
        self.assertEqual(0, len(Activity.objects.all()))


class TestFacility(TestCase):
    """
    Verify CRUD operations for Facility model.
    """

    def setUp(self):
        self.facility = Facility(name="Food")
        self.facility.save()

    def test_create_facility(self):
        """
        Test facility is created successfully after save operation.
        """
        self.assertIsNotNone(self.facility.id)

    def test_update_facility(self):
        """
        Test facility object updates are persisted successfully after save.
        """
        id = self.facility.id
        self.facility.name = "No Food"
        self.facility.save()
        updated_facility = Facility.objects.filter(id=id)[0]
        self.assertEqual("No Food", updated_facility.name)

    def test_delete_facility(self):
        """
        Test the facility object is not longer persisted after delete.
        """
        self.assertEqual(1, len(Facility.objects.all()))
        self.facility.delete()
        self.assertEqual(0, len(Facility.objects.all()))
