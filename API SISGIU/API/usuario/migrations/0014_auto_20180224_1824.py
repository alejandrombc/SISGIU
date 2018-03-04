# Generated by Django 2.0 on 2018-02-24 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0013_auto_20180108_2150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='direccion',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='personaldocente',
            name='direccion',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='celular',
            field=models.CharField(blank=True, max_length=14),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='estado_civil',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='nacionalidad',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='sexo',
            field=models.CharField(blank=True, max_length=1),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='telefono_casa',
            field=models.CharField(blank=True, max_length=14),
        ),
    ]