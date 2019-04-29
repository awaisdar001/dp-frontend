"""Url definitions for api"""
from rest_framework import routers

from views import TripViewSet

app_name = 'trips-api'

router = routers.DefaultRouter()
router.register('trips', TripViewSet, 'trips')
urlpatterns = router.urls
