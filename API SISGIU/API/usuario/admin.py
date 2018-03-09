from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Estudiante)
admin.site.register(TipoPostgrado)
admin.site.register(EstadoEstudiante)
admin.site.register(PersonalDocente)
admin.site.register(PersonalAdministrativo)