"""djreact URL Configuration"""

from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('', include('djangoapps.trips.urls')),
    url('api/', include('djangoapps.api.urls'))
]
