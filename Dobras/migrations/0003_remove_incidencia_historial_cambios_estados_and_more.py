# Generated by Django 5.0 on 2024-11-11 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dobras', '0002_alter_incidencia_usuario_asignado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incidencia',
            name='historial_Cambios_estados',
        ),
        migrations.AlterField(
            model_name='incidencia',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
    ]