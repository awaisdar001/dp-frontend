from datetime import datetime, timedelta

import ddt
from django.urls import reverse
from django.utils.timezone import get_current_timezone
from rest_framework.test import APITestCase

from djangoapps.tests.factories import TripFactory


@ddt.ddt
class TestTripList(APITestCase):
    trips_list_url = reverse("trips-api:trips-list")

    def setUp(self):
        self.trip = TripFactory(
            locations_included=['Lahore', 'Gilgit'], trip_schedule=2)

    def _make_trip_schedules_in_past(self, trip=None):
        """Convert trip schedules in past"""
        trip = trip if trip else self.trip
        today = datetime.now(tz=get_current_timezone())
        past_trip_date = today - timedelta(days=7)

        trip_schedules = trip.trip_schedule.all()
        trip_schedules.update(date_from=past_trip_date)

    def get_trips_list_result(self):
        """ Get trip list by calling api and return results"""
        response = self.client.get(self.trips_list_url, {})
        return response.json()['results']

    def test_without_authentication(self):
        """
        Verify that we have access to all the data w/o authentication.
        """
        self.client.logout()
        response = self.client.get(self.trips_list_url, {})
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(response.data['count'], 1)

    def test_trip_list_pagination(self):
        """
        Verify if the returned data has expected pagination keys
        """
        expected_keys = [
            u'count', u'results', u'next', u'current', u'pages', u'previous'
        ]
        response = self.client.get(self.trips_list_url, {})
        pagination_keys = response.json()
        self.assertTrue(
            all([expected_key in pagination_keys for expected_key in expected_keys])
        )

    def test_trip_list_results(self):
        """Verify if the returned data contains expected result keys"""
        expected_keys = [
            u'id', u'activities', u'name', u'trip_schedule', u'starting_location',
            u'description', u'locations_included', u'slug', u'price',
            u'facilities', u'_metadata', u'duration', u'metadata'
        ]
        results = self.get_trips_list_result()
        self.assertEqual(len(results), 1)

        result_keys = results[0].keys()
        self.assertTrue(
            all([expected_key in result_keys for expected_key in expected_keys])
        )

    def test_filter_inactive_trips(self):
        """Verify inactive trips are not returned in api call"""
        trips = self.get_trips_list_result()
        self.assertEqual(len(trips), 1)
        self.trip.deleted = True
        self.trip.save()
        trips = self.get_trips_list_result()
        self.assertEqual(len(trips), 0)

    def test_filter_inactive_schedule_trips(self):
        """
        Verify that api filters out inactive trips

        Create a trip with active schedules and verify it is listed
        correctly.
        Mark the trip schedule dates in the past and try to fetch trip lists again.
        Verify the trip is filtered out.
        """
        trips = self.get_trips_list_result()
        self.assertEqual(len(trips), 1)
        trip_schedule_via_api = trips[0]['trip_schedule']

        trip_schedules = self.trip.trip_schedule.all()
        self.assertEqual(trip_schedules.count(), len(trip_schedule_via_api))

        self._make_trip_schedules_in_past()

        trips = self.get_trips_list_result()
        self.assertEqual(len(trips), 1)
        trip_schedule_via_api = trips[0]['trip_schedule']
        self.assertEqual(len(trip_schedule_via_api), 0)
