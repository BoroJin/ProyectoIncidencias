# Generated by Django 5.1.3 on 2024-11-30 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangoApp', '0002_alter_tickets_correo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mensaje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mensaje_usuario', models.TextField(blank=True, null=True)),
                ('mensaje_soporte', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
