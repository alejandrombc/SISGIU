# Generated by Django 2.0 on 2018-05-11 20:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0005_auto_20180511_1908'),
    ]

    operations = [
        migrations.RenameField(
            model_name='personaldocente',
            old_name='tipo_postgrado',
            new_name='id_tipo_postgrado',
        ),
    ]
