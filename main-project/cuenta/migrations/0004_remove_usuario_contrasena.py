# Generated by Django 5.1.2 on 2024-11-10 22:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuenta', '0003_remove_usuario_is_active_remove_usuario_is_staff'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='contrasena',
        ),
    ]
