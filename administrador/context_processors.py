#maxi
from .models import Logo

def logo_context(request):
    logo = Logo.objects.first()  # Obtenemos el primer (y único) registro de configuración
    return {
        'logo': logo.imagen.url if logo and logo.imagen else None,
        'nombre_municipalidad': logo.nombre_municipalidad if logo else "Municipalidad X"
    }
