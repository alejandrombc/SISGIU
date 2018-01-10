# Generated by Django 2.0 on 2018-01-06 18:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asignatura',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=6)),
                ('nombre', models.CharField(max_length=40)),
                ('unidad_credito', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TipoAsignatura',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='asignatura',
            name='tipo_asignatura',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='asignatura.TipoAsignatura'),
        ),
        migrations.AddField(
            model_name='asignatura',
            name='tipo_postgrado',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='usuario.TipoPostgrado'),
        ),
    ]