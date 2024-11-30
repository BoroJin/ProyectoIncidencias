from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Usuario, Ticket
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.conf import settings
from django.urls import reverse
from django.contrib import messages
from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def crear_ticket(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            correo_electronico = data.get("correo_electronico")
            asunto = data.get("asunto")
            descripcion = data.get("descripcion")
            
            # Verificar si el correo existe en la tabla de usuarios
            usuario = Usuario.objects.filter(correo_electronico=correo_electronico).first()
            if not usuario:
                return JsonResponse({"error": "El correo no está registrado"}, status=400)

            # Crear el ticket
            Ticket.objects.create(
                usuario=usuario,
                asunto=asunto,
                descripcion=descripcion
            )

            return JsonResponse({"success": "Ticket creado con éxito"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Verifica si el usuario existe
        try:
            user = Usuario.objects.get(correo_electronico=email)
            if user.password == password:
                refresh = RefreshToken.for_user(user)

                # Define las URLs de redirección según el rol
                redirect_url = ''
                if user.rol == 'Administrador':
                    redirect_url = 'http://127.0.0.1:8000/administrador/adm_principal/'
                elif user.rol == 'Resolutor': 
                    redirect_url = 'http://127.0.0.1:8000/resolutor/'
                elif user.rol == 'Director':  
                    redirect_url = 'http://127.0.0.1:8000/director/'
                elif user.rol == 'Gestor Territorial':    
                    redirect_url = 'http://127.0.0.1:8000/gestor_territorial/'
                elif user.rol == 'Departamento de obras':      
                    redirect_url = 'http://127.0.0.1:8000/depto-obras/'

                # Agregar el nombre del usuario en la respuesta
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'redirect_url': redirect_url,
                    'user_name': user.nombre,  # Modificacion aqui, para enviar el nombre de usuario para R.auditoria
                    'user_id': user.id,         # ID del usuario
                })
            else:
                return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

def adm_recuperacion(request):
    return render(request, 'recupera_contraseña.html')

def restablecer_contra(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            usuario = Usuario.objects.get(correo_electronico=email)
            reset_url = request.build_absolute_uri(
                reverse('restablecer', args=[usuario.id])
            )
            send_mail(
                subject="Restablecimiento de contraseña",
                message=f"Hola {usuario.nombre},\n\nHaz clic en el siguiente enlace para restablecer tu contraseña:\n\n{reset_url}\n\nSi no solicitaste esto, ignora este mensaje.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
            messages.success(request, 'Hemos enviado un enlace para restablecer tu contraseña.')
            return redirect('recuperar')
        except Usuario.DoesNotExist:
            messages.error(request, 'No se encontró un usuario con ese correo electrónico.')
    return render(request, 'recupera_contraseña.html')

def restablecer(request, user_id):
    try:
        usuario = Usuario.objects.get(pk=user_id)
    except Usuario.DoesNotExist:
        raise Http404("Usuario no encontrado")

    if request.method == 'POST':
        nueva_contrasena = request.POST.get('password')
        if nueva_contrasena:
            usuario.password = nueva_contrasena 
            usuario.save()
            messages.success(request, 'Contraseña actualizada exitosamente.')
            return redirect('http://localhost:3000/') 
        else:
            messages.error(request, 'Por favor, introduce una contraseña válida.')
    return render(request, 'restablecer_contrasena.html', {'usuario': usuario})