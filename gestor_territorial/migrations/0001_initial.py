# Generated by Django 5.1.2 on 2024-11-30 23:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('director', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Incidencia',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('multimedia_resolutor', models.FileField(blank=True, null=True, upload_to='incidencias/adjuntos/resolutor')),
                ('multimedia_gestor', models.FileField(blank=True, null=True, upload_to='incidencias/adjuntos/gestor')),
                ('id_usuario_gestorTerritorial', models.IntegerField(blank=True, null=True)),
                ('titulo_Incidencia', models.CharField(max_length=200)),
                ('estado', models.CharField(choices=[('iniciada', 'Iniciada'), ('verificada', 'Verificada'), ('no verificada', 'No Verificada'), ('validada', 'Validada'), ('rechazada', 'Rechazada'), ('asignada', 'Asignada'), ('en proceso', 'En Proceso'), ('inconclusa', 'Inconclusa'), ('finalizada', 'Finalizada')], default='iniciada', max_length=15)),
                ('tipo', models.CharField(blank=True, max_length=200, null=True)),
                ('descripcion', models.TextField()),
                ('fecha_Reporte', models.DateTimeField(auto_now_add=True)),
                ('latitud', models.FloatField()),
                ('longitud', models.FloatField()),
                ('urgencia', models.CharField(choices=[('baja', 'Baja'), ('media', 'Media'), ('alta', 'Alta'), ('critica', 'Crítica')], default='media', max_length=10)),
                ('resolutor_Asignado', models.CharField(blank=True, max_length=100, null=True)),
                ('id_usuario_departamento', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Respuesta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor', models.TextField()),
                ('campo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='director.campo')),
                ('incidencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respuestas', to='gestor_territorial.incidencia')),
            ],
        ),
    ]