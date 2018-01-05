from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from usuario import views



urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('usuario.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

]