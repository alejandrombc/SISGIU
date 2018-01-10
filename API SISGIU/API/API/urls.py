from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from usuario import views
from asignatura import views
from tramite import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns,static
from django.conf import settings
from rest_framework_jwt.views import refresh_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('usuario.urls')),
    url(r'^', include('asignatura.urls')),
    url(r'^', include('tramite.urls')),
    url(r'^api-auth/', include('rest_auth.urls' )),

    # url(r'^', include('rest_auth.urls')),
    url(r'^registration/', include('rest_auth.registration.urls')),

    url(r'^refresh-token/', refresh_jwt_token),
]

# For image files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)