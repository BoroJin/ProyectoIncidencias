# Generated by Django 5.1.2 on 2024-11-09 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Logo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_municipalidad', models.CharField(default='Municipalidad X', max_length=255, null=True)),
                ('imagen', models.ImageField(null=True, upload_to='logos/')),
                ('actualizado_en', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol', models.CharField(choices=[('admin', 'Administrador'), ('g.t', 'Gestor Territorial'), ('d', 'Director'), ('dep', 'Departamento de obras'), ('r', 'Resolutor')], max_length=1000)),
                ('nombre', models.CharField(max_length=100)),
                ('contrasena', models.CharField(default='1234', max_length=100)),
                ('correo_electronico', models.EmailField(max_length=254)),
            ],
        ),
    ]