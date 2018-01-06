from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from usuario import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns,static
from django.conf import settings



urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('usuario.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

# For image files
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)