from django.shortcuts import render
from .forms import incidencia
from .models import Incidencia #esto es de la bd

from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def dashboard(request):
    return render(request, 'dashboard/dashboard_director.html')

def incidencias(request):
    return render(request, 'dashboard/incidencias.html')

def formulario(request):
    if request.method == 'POST':
        formulario = Incidencia(request.POST)
        if formulario.is_valid():
            nombre = formulario.cleaned_data['nombre']
            # Recoger las variables dinámicas
            variables = {key: value for key, value in request.POST.items() if key not in ['csrfmiddlewaretoken', 'nombre']}
            return render(request, 'dashboard/formulario.html', {'nombre': nombre, 'variables': variables, 'formulario': formulario})
           
          # Pasar el formulario
    else:
        formulario = Incidencia()

    return render(request, 'dashboard/formulario.html', {'formulario': formulario})



@csrf_exempt# Esto desactiva la verificación CSRF; usa con precaución
def crear_atributo(request):
    if request.method == 'POST':
        try :
            data = json.loads(request.body)  # Cargar los datos JSON
            titulo = data.get('titulo')
            nombree = data.get('nombree')
            opcion=data.get('opcion')
            
            print(titulo)
            print(nombree)
            print(opcion)
            if opcion=='texto':
                with connection.cursor() as cursor:
                    sql = f"ALTER TABLE dashboard_incidencia ADD COLUMN {nombree} VARCHAR(255);"
                    cursor.execute(sql)

            if opcion=='numero':
                with connection.cursor() as cursor:
                    sql = f"ALTER TABLE dashboard_incidencia ADD COLUMN {nombree} INTEGER;"
                    cursor.execute(sql)

            if opcion=='estado':
                with connection.cursor() as cursor:
                    sql = f"ALTER TABLE dashboard_incidencia ADD COLUMN {nombree} VARCHAR(255);"
                    cursor.execute(sql)


            return JsonResponse({'mensaje': 'Columna agregada exitosamente'})
        
        except Exception as e:
            # Devolver el error en caso de fallo
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

        

