# Generated by Django 2.0 on 2018-03-21 02:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('asignatura', '0007_auto_20180313_2109'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='asignatura',
            name='tipo_postgrado',
        ),
    ]
