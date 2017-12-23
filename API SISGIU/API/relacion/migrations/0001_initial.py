# Generated by Django 2.0 on 2017-12-23 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tramite', '0001_initial'),
        ('usuario', '0004_auto_20171223_1444'),
        ('periodo', '0001_initial'),
        ('asignatura', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocenteAsignatura',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aula', models.IntegerField()),
                ('horario_dia', models.CharField(max_length=10)),
                ('horario_hora', models.TimeField()),
                ('asignatura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='asignatura.Asignatura')),
                ('docente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuario.PersonalDocente')),
                ('periodo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='periodo.Periodo')),
            ],
        ),
        migrations.CreateModel(
            name='EstudianteAsignatura',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nota_definitiva', models.IntegerField()),
                ('asignatura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='asignatura.Asignatura')),
            ],
        ),
        migrations.CreateModel(
            name='EstudianteTramite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_creacion', models.DateField(auto_now_add=True)),
                ('fecha_tope', models.DateField()),
                ('mensaje', models.TextField()),
                ('estado_tramite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tramite.EstadoTramite')),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuario.Estudiante')),
                ('tramite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tramite.Tramite')),
            ],
        ),
        migrations.CreateModel(
            name='PeriodoEstudiante',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pagado', models.BooleanField()),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuario.Estudiante')),
                ('periodo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='periodo.Periodo')),
            ],
        ),
        migrations.AddField(
            model_name='estudianteasignatura',
            name='periodo_estudiante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='relacion.PeriodoEstudiante'),
        ),
    ]
