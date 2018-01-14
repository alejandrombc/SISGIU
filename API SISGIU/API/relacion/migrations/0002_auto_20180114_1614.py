# Generated by Django 2.0 on 2018-01-14 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('relacion', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='docenteasignatura',
            name='horario_dia',
            field=models.CharField(choices=[('0', 'lunes'), ('1', 'martes'), ('2', 'miercoles'), ('3', 'jueves'), ('4', 'viernes'), ('5', 'sabado'), ('6', 'domingo')], max_length=1),
        ),
        migrations.AlterField(
            model_name='docenteasignatura',
            name='horario_hora',
            field=models.CharField(max_length=15),
        ),
    ]
