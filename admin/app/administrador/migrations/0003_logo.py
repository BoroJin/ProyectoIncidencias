# Generated by Django 5.1.2 on 2024-10-16 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0002_alter_usuario_rol'),
    ]

    operations = [
        migrations.CreateModel(
            name='Logo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='logos/')),
                ('actualizado_en', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
