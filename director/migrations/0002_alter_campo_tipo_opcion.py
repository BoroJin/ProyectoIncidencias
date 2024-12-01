# Generated by Django 5.1.3 on 2024-11-10 05:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('director', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campo',
            name='tipo',
            field=models.CharField(choices=[('texto', 'Texto'), ('checkbox', 'Casilla de verificación'), ('select', 'Desplegable')], max_length=50),
        ),
        migrations.CreateModel(
            name='Opcion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('valor', models.CharField(max_length=255)),
                ('campo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='opciones', to='director.campo')),
            ],
        ),
    ]