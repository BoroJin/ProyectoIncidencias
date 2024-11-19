# Generated by Django 5.1.2 on 2024-11-11 23:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Incidencia',
            fields=[
                ('id_incidencia', models.AutoField(primary_key=True, serialize=False)),
                ('direccion_multimedia', models.CharField(max_length=250)),
                ('titulo', models.CharField(max_length=50)),
                ('estado_incidencia', models.CharField(max_length=12)),
                ('descripcion', models.CharField(max_length=500)),
                ('fecha_creacion', models.DateField()),
                ('ubicacion', models.CharField(max_length=100)),
                ('nivel_urgencia', models.CharField(max_length=8)),
            ],
            options={
                'verbose_name': 'Incidencia',
                'verbose_name_plural': 'Incidencias',
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('contrasena', models.CharField(max_length=25)),
                ('correo', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
            },
        ),
        migrations.CreateModel(
            name='RegistroAuditoriaAsignacion',
            fields=[
                ('id_registro', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_asignacion', models.DateField()),
                ('estado', models.CharField(max_length=12)),
                ('comentario', models.CharField(max_length=500)),
                ('id_incidencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.incidencia')),
                ('id_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.usuario')),
            ],
            options={
                'verbose_name': 'Registro de Auditoría/Asignación',
                'verbose_name_plural': 'Registros de Auditoría/Asignación',
            },
        ),
        migrations.AddField(
            model_name='incidencia',
            name='usuario_asignado',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.usuario'),
        ),
    ]