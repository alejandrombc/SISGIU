# Generated by Django 2.0 on 2018-03-09 00:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relacion', '0002_auto_20180114_1614'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='asignaturatipopostgrado',
            table='asignatura_tipoPostgrado',
        ),
        migrations.AlterModelTable(
            name='docenteasignatura',
            table='docente_asignatura',
        ),
        migrations.AlterModelTable(
            name='estudianteasignatura',
            table='estudiante_asignatura',
        ),
        migrations.AlterModelTable(
            name='estudiantetramite',
            table='estudiante_tramite',
        ),
        migrations.AlterModelTable(
            name='periodoestudiante',
            table='periodo_estudiante',
        ),
    ]
