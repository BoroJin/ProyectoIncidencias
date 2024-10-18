from django.shortcuts import render, redirect, get_object_or_404
from .models import Usuario, Logo  # Suponiendo que tienes un modelo llamado Usuario
from django.contrib import messages
from django.core.files.storage import FileSystemStorage


def adm_recuperacion(request):
    return render(request, 'administrador/recupera_contraseña.html')

def adm_inicio_sesion(request):
    return render(request, 'administrador/Adm_inicio_sesion.html')

def adm_principal(request):
    return render(request, 'administrador/Adm_principal.html')

def adm_ticket(request):
    return render(request, 'administrador/Adm_ticket.html')

def adm_gestion_usuarios(request):
    if request.method == 'POST':  # Si es un POST, significa que el formulario fue enviado
        nombre = request.POST['nombre']
        correo = request.POST['correo']
        rol = request.POST['rol']
        
        # Crear un nuevo usuario
        nuevo_usuario = Usuario(nombre=nombre, correo_electronico=correo, rol=rol)
        nuevo_usuario.save()
        
        messages.success(request, 'Usuario agregado exitosamente')
        return redirect('adm_gestion_usuarios')

    # Obtener todos los usuarios de la base de datos
    usuarios = Usuario.objects.all()

    return render(request, 'administrador/Adm_gestion_usuarios.html', {'usuarios': usuarios})

def adm_cargar_masiva(request):
    return render(request, 'administrador/Adm_cargar_masiva.html')

def adm_actualizar_logo(request):
    logo = Logo.objects.first()
    
    if request.method == 'POST':
        nombre_municipalidad = request.POST.get('nombre_municipalidad')
        if request.FILES.get('imagen'):
            logo.imagen = request.FILES['imagen']
        logo.nombre_municipalidad = nombre_municipalidad
        logo.save()

        messages.success(request, 'El nombre y el logo de la municipalidad se han actualizado.')
        return redirect('adm_principal')
    
    context = {
        'form': logo  # Pasamos el objeto `logo` que contiene el nombre y la imagen actuales
    }
    return render(request, 'administrador/Adm_actualizar_logo.html', context)

def eliminar_usuario(request, usuario_id):
    if request.method == 'POST':
        usuario = get_object_or_404(Usuario, id=usuario_id)
        usuario.delete()
        messages.success(request, 'Usuario eliminado correctamente.')
    return redirect('adm_gestion_usuarios')  # Redirige de vuelta a la gestión de usuarios
