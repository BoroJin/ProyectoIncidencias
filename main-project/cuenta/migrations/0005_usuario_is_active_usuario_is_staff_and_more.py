# Generated by Django 5.1.2 on 2024-11-19 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cuenta', '0004_remove_usuario_contrasena'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='password',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
