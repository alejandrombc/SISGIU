# Generated by Django 2.0 on 2018-04-23 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0004_remove_tipopostgrado_asignaturas_por_periodo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='nacionalidad',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
