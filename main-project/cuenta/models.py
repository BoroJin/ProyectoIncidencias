# models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, correo_electronico, contrasena=None, **extra_fields):
        if not correo_electronico:
            raise ValueError('El correo electrónico es obligatorio')
        correo_electronico = self.normalize_email(correo_electronico)
        user = self.model(correo_electronico=correo_electronico, password=contrasena, **extra_fields)
        user.save(using=self._db)
        return user

class Usuario(AbstractBaseUser, PermissionsMixin):
    ROLES = [
        ('admin', 'Administrador'),
        ('g.t', 'Gestor Territorial'),
        ('d', 'Director'),
        ('dep', 'Departamento de obras'),
        ('r', 'Resolutor'),
    ]
    
    rol = models.CharField(max_length=1000, choices=ROLES)
    nombre = models.CharField(max_length=100)
    correo_electronico = models.EmailField(unique=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'correo_electronico'
    REQUIRED_FIELDS = ['nombre', 'rol']

    def __str__(self):
        return self.nombre
