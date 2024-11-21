# Generated by Django 5.1.3 on 2024-11-10 04:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Formulario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('descripcion', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Campo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('tipo', models.CharField(choices=[('texto', 'Texto'), ('checkbox', 'Casilla de verificación')], max_length=50)),
                ('es_obligatorio', models.BooleanField(default=False)),
                ('formulario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='campos', to='director.formulario')),
            ],
        ),
    ]