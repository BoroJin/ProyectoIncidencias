from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Usuario
# views.py
from django.core.mail import send_mail
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Verifica si el usuario existe
        try:
            user = Usuario.objects.get(correo_electronico=email)
            if user.password == password:
                refresh = RefreshToken.for_user(user)
                refresh = RefreshToken.for_user(user)
                    
                # Define las URLs de redirección según el rol
                redirect_url = ''
                if user.rol == 'Administrador':
                    redirect_url = 'http://127.0.0.1:8000/administrador/adm_principal/'
                elif user.rol == 'Director': 
                    redirect_url = 'http://127.0.0.1:8000/administrador/adm_gestion_usuarios/'

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'redirect_url': redirect_url  # Envía la URL completa de redirección
                })
            else:
                return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)




def enviar_correo(request):
    if request.method == "POST":
        # Obtén la información del formulario
        destinatario = request.POST.get('email')           # Email del destinatario
        asunto = request.POST.get('asunto', 'Sin asunto')  # Asunto del correo
        mensaje = request.POST.get('mensaje', '')          # Mensaje del correo

        # Envío del correo
        try:
            send_mail(
                asunto,
                mensaje,
                settings.EMAIL_HOST_USER,  # Remitente (correo configurado en settings)
                [destinatario],            # Destinatarios (lista de emails)
                fail_silently=False,
            )
            return HttpResponse("Correo enviado correctamente.")
        except Exception as e:
            return HttpResponse(f"Error al enviar el correo: {str(e)}")

    return render(request, 'enviar_correo.html')
