# Generated by Django 2.0 on 2018-04-13 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipopostgrado',
            name='asignaturas_maximas',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tipopostgrado',
            name='tipo',
            field=models.CharField(max_length=150),
        ),
    ]
