# Generated by Django 5.1.3 on 2024-11-10 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestor_territorial', '0008_alter_incidencia_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incidencia',
            name='estado',
            field=models.CharField(choices=[('iniciada', 'Iniciada'), ('rechazada', 'Rechazada'), ('aprobada', 'Aprobada'), ('asignada', 'Asignada'), ('inconclusa', 'Inconclusa'), ('finalizada', 'Finalizada'), ('validada', 'Validada')], default='pendiente', max_length=15),
        ),
    ]