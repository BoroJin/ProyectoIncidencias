from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Usuario

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
                    redirect_url = 'http://127.0.0.1:8000/adm_principal/'
                elif user.rol == 'Director': 
                    redirect_url = 'http://127.0.0.1:8000/exportar_usr_vista/'

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'redirect_url': redirect_url  # Envía la URL completa de redirección
                })
            else:
                return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

       