# Generated by Django 5.1.2 on 2024-11-19 17:57

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cuenta', '0005_usuario_is_active_usuario_is_staff_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asunto', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('estado', models.CharField(choices=[('abierto', 'Abierto'), ('en_proceso', 'En proceso'), ('resuelto', 'Resuelto'), ('cerrado', 'Cerrado')], default='abierto', max_length=20)),
                ('fecha_creacion', models.DateTimeField(default=django.utils.timezone.now)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]