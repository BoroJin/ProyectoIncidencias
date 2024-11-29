# Generated by Django 5.1.2 on 2024-10-16 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0005_configuracionmunicipalidad_delete_logo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Logo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_municipalidad', models.CharField(default='Municipalidad X', max_length=255)),
                ('imagen', models.ImageField(upload_to='logos/')),
                ('actualizado_en', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.DeleteModel(
            name='ConfiguracionMunicipalidad',
        ),
    ]
