# Generated by Django 2.0 on 2018-03-09 00:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('periodo', '0003_auto_20180308_2042'),
    ]

    operations = [
        migrations.RenameField(
            model_name='periodo',
            old_name='nombre',
            new_name='descripcion',
        ),
    ]
