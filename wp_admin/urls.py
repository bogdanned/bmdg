"""wp_admin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^nested_admin/', include('nested_admin.urls')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^', include('app_index.urls')),
    url(r'^', include('app_analysis.urls')),
    url(r'^', include('app_hosting.urls')),
    url(r'^', include('app_users.urls')),
]


"""
url(r'^', include('app_users.urls')),
url(r'^', include('app_hosting.urls')),
url(r'^analysis/', include('app_analysis.urls')),
url(r'^docs/', include('rest_framework_docs.urls')),
"""
# Media URL
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
