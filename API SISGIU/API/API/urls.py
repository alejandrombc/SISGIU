from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from usuario import views
from asignatura import views
from periodo import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns, static
from django.conf import settings
from rest_framework_jwt.views import refresh_jwt_token
from .bd_imports_exports import import_bd
from rest_framework.documentation import include_docs_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('usuario.urls')),
    url(r'^', include('asignatura.urls')),
    url(r'^', include('periodo.urls')),
    url(r'^', include('relacion.urls')),

    url(r'^api/', include('rest_auth.urls')),
    url(r'^api/registration/', include('rest_auth.registration.urls')),
    url(r'^refresh-token/', refresh_jwt_token),

    url(r'^importar/(?P<tipo>[\w\-]+)?/?$', import_bd),  # BD Imports
    url(r'^docs/', include_docs_urls(title='SISGIU API')),  # API Documentation

    url(r'^api-auth/', include('rest_framework.urls')),  # Basic authentication

]

# For image files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
