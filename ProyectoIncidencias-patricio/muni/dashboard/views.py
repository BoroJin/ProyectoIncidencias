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
    global columnas1
    columnas1 = []
    try:
        with connection.cursor() as cursor:
            # Consulta para obtener los nombres de las columnas
            cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'dashboard_incidencia';")
            columnas1 = [row[0] for row in cursor.fetchall()]
            print(columnas1)
    finally:
        connection.close()
    return render(request, 'dashboard/incidencias.html',{'columnas1': columnas1})

def formulario(request):
    global columnas
    columnas = []
    try:
        with connection.cursor() as cursor:
            # Consulta para obtener los nombres de las columnas
            cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'dashboard_incidencia';")
            columnas = [row[0] for row in cursor.fetchall()]
            print(columnas)
    finally:
        connection.close()
    return render(request, 'dashboard/formulario.html', {'columnas': columnas})



@csrf_exempt# Esto desactiva la verificación CSRF; usa con precaución
def crear_atributo(request):
    if request.method == 'POST':
        try :
            data = json.loads(request.body)  # Cargar los datos JSON
            titulo = data.get('titulo')
            nombree = data.get('nombree')
            opcion=data.get('opcion')
            obligatorio=data.get('obligatorio')
            


            
            with connection.cursor() as cursor:
                sql = f"ALTER TABLE dashboard_incidencia ADD COLUMN {nombree} {opcion} {obligatorio};"
                cursor.execute(sql)
                sqlComentario = f"COMMENT ON COLUMN dashboard_incidencia.{nombree} IS '{titulo}';"
                cursor.execute(sqlComentario)
                return render(request, 'dashboard/formulario.html') 
  
        except Exception as e:
            # Devolver el error en caso de fallo
            return JsonResponse({'error': str(e)}, status=500)
       
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    return render(request,'dashboard/formulario.html')

@csrf_exempt
def Eliminar_columna(request):
    if request.method == 'POST':
        valor_seleccionado = request.POST.get('eliminar')  # Obtiene el valor seleccionado

        try:
            with connection.cursor() as cursor:
                cursor.execute(f"ALTER TABLE dashboard_incidencia DROP COLUMN {valor_seleccionado}; ")
        finally:
            connection.close()
            columnas.remove(valor_seleccionado)
        
    return render(request, 'dashboard/formulario.html', {'columnas': columnas})

#probando commit