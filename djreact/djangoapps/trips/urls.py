from django.conf.urls import url
from django.views import generic

urlpatterns = [
    url(r'^view2/',
        generic.TemplateView.as_view(template_name='view2.html')),
    url(r'^$',
        generic.TemplateView.as_view(template_name='view1.html')),
]
