# Generated by Django 5.1.3 on 2024-11-30 01:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gestor_territorial', '0002_incidencia_tipo_alter_incidencia_latitud_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='incidencia',
            old_name='comentarios',
            new_name='comentario',
        ),
    ]