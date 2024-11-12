from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone
from .models import Incidencia , Usuario,RegistroAuditoriaAsignacion

from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def dashboard(request):
    return render(request, 'dashboard/dashboard_director.html')

def incidencias(request):
    incidencia = Incidencia.objects.all()
    return render(request,'dashboard/incidencias.html',{'incidencia':incidencia})

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
            


            if opcion == 'VARCHAR(255)':
                with connection.cursor() as cursor:
                    sql = f"ALTER TABLE dashboard_incidencia ADD COLUMN {nombree} {opcion} {obligatorio} DEFAULT 'Vacío';"
                    cursor.execute(sql)
                    sqlComentario = f"COMMENT ON COLUMN dashboard_incidencia.{nombree} IS '{titulo}';"
                    cursor.execute(sqlComentario)
                    return render(request, 'dashboard/formulario.html') 
            if opcion == 'INTEGER':
                with connection.cursor() as cursor:
                    sql = f"ALTER TABLE dashboard_incidencia ADD COLUMN {nombree} {opcion} {obligatorio} DEFAULT 0;"
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
def rechazoIncidencia (request,id_incidencia):
    incidencia = Incidencia.objects.get(id_incidencia=id_incidencia)

    if incidencia.estado_incidencia == 'Rechazada':
        return redirect('/incidencias/')
    return render(request, 'dashboard/rechazo_de_incidencias.html', {'incidencia': incidencia})


def rechazarIncidencia(request):
    id_incidencia = request.POST.get('ID')
    id_incidencia1 = int(id_incidencia)


    justificacion = request.POST.get('justificacion')

    nombre_usuario = request.POST.get('user')
    usuario = Usuario.objects.get(nombre = nombre_usuario)
    id_usuario = usuario.id_usuario

    fecha_asignacion = timezone.now()


    estado = 'Rechazada'
    registro = RegistroAuditoriaAsignacion.objects.create(id_incidencia_id = id_incidencia1,comentario = justificacion,estado = estado, id_usuario_id = id_usuario, fecha_asignacion = fecha_asignacion)

    incidencia = Incidencia.objects.get(id_incidencia=id_incidencia)
    incidencia.estado_incidencia = 'Rechazada'
    incidencia.save()
    return redirect('/incidencias/')