# Generated by Django 5.1.2 on 2024-10-15 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol', models.CharField(max_length=100)),
                ('nombre', models.CharField(max_length=100)),
                ('correo_electronico', models.EmailField(max_length=254)),
            ],
        ),
    ]
