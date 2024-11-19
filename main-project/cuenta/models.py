from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, correo_electronico, contrasena=None, **extra_fields):
        if not correo_electronico:
            raise ValueError('El correo electrónico es obligatorio')
        
        correo_electronico = self.normalize_email(correo_electronico)
        
        # Crear usuario con o sin contraseña
        user = self.model(correo_electronico=correo_electronico, **extra_fields)
        if contrasena:  # Si hay contraseña, asignarla
            user.set_password(contrasena)
        else:  # Si no, dejar el campo sin encriptar
            user.password = contrasena
        user.save(using=self._db)
        return user

    def create_superuser(self, correo_electronico, contrasena=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not contrasena:
            contrasena = "admin123"  # Contraseña predeterminada para desarrollo

        return self.create_user(correo_electronico, contrasena, **extra_fields)


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
    password = models.CharField(max_length=128, blank=True, null=True)  # Permitir valores nulos o vacíos
    is_staff = models.BooleanField(default=False)  # Requerido para acceder al admin
    is_active = models.BooleanField(default=True)  # Para activar/desactivar usuarios

    objects = CustomUserManager()

    USERNAME_FIELD = 'correo_electronico'
    REQUIRED_FIELDS = ['nombre', 'rol']

    def __str__(self):
        return self.nombre
