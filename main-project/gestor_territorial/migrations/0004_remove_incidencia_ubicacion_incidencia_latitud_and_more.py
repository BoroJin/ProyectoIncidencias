# Generated by Django 5.1.3 on 2024-11-10 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestor_territorial', '0003_respuesta'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incidencia',
            name='ubicacion',
        ),
        migrations.AddField(
            model_name='incidencia',
            name='latitud',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='incidencia',
            name='longitud',
            field=models.FloatField(blank=True, null=True),
        ),
    ]