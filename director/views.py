from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone
from .models import Campo, Opcion, Formulario
from gestor_territorial.models import Incidencia
from cuenta.models import Usuario
import folium
from resolutor.views import crear_registro




def dashboard(request):
    global user_id, user_name
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')
    print (user_name)
    incidencia = Incidencia.objects.filter(estado='iniciada')
    initialMap = folium.Map(location=[-33.427656074857076, -70.61159044504167], zoom_start=9)
    for location in incidencia:
        coordinates = (location.latitud, location.longitud)
        folium.Marker(coordinates, popup='Nombre:'+ location.titulo_Incidencia).add_to(initialMap)

    return render(request, 'director/dashboard.html',{'incidencia':incidencia,'map':initialMap._repr_html_(),'user_name': user_name})

def incidencias(request):
    incidencia = Incidencia.objects.all()
    usuarios = Usuario.objects.filter(rol='r')
    return render(request,'director/incidencias.html',{'incidencia':incidencia, 'usuarios':usuarios,'user_name': user_name})


def asignarUsuario (request):
    id_incidencia = request.POST.get('ID_asignar')

    usuario_id = request.POST.get('usuario_id')

    incidencia = Incidencia.objects.get(id=id_incidencia)
    crear_registro(id_incidencia,incidencia.estado,'asignada',"La incidencia se ah asginado",user_id)
    incidencia.resolutor_Asignado = usuario_id
    incidencia.estado = 'asignada'
    incidencia.save()

    return redirect('director:incidencias')

def deshacerAsignacion(request,id):

    incidencia = Incidencia.objects.get(id=id)
    crear_registro(id,incidencia.estado,'iniciada',"Se de hizo la asignacion",user_id)
    incidencia.resolutor_Asignado = 'Sin asignar'
    incidencia.estado = 'iniciada'
    incidencia.save()

    return redirect('director:incidencias')


def rechazarIncidencia(request):

    id_incidencia = request.POST.get('ID_rechazo')
    id_incidencia1 = int(id_incidencia)


    justificacion = request.POST.get('justificacion')

    #nombre_usuario = request.POST.get('user_rechazo')
    #usuario = Usuario.objects.get(nombre = nombre_usuario)
    #id_usuario = usuario.id_usuario

    #fecha_asignacion = timezone.now()

    #estado = 'rechazada'
    #registro = RegistroAuditoriaAsignacion.objects.create(id_incidencia_id = id_incidencia1,comentario = justificacion,estado = estado, id_usuario_id = id_usuario, fecha_asignacion = fecha_asignacion)

    incidencia = Incidencia.objects.get(id=id_incidencia)
    print ("Primer",justificacion)
    print ("############")

    crear_registro(id_incidencia,incidencia.estado,'rechazada',justificacion,user_id)

    incidencia.estado = 'rechazada'
    incidencia.resolutor_Asignado = 'none'
    incidencia.save()
    return redirect('director:incidencias')


def aprobar_rechazar(request, incidencia_id, accion):
    incidencia = get_object_or_404(Incidencia, id=incidencia_id)
    if accion == "aprobar":
        incidencia.estado = "aprobada"
    elif accion == "rechazar":
        incidencia.estado = "rechazada"
    incidencia.save()
    return redirect('director:home')  # Redirige al home después de la acción

def eliminar_formulario(request, formulario_id):
    formulario = Formulario.objects.get(id=formulario_id)
    formulario.delete()
    return redirect('director:ver_formularios')

def crear_formulario(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion', '')
        formulario = Formulario(nombre=nombre, descripcion=descripcion)
        formulario.save()
        return redirect('director:gestionar_campos', formulario_id=formulario.id)  # Redirige a la vista de gestión de campos
    return render(request, 'director/crear_formulario.html')

def gestionar_campos(request, formulario_id):
    formulario = Formulario.objects.get(id=formulario_id)
    campos = formulario.campos.all()
    if request.method == 'POST':
        if 'agregar' in request.POST:
            nombre = request.POST.get('nombre_campo')
            tipo = request.POST.get('tipo_campo')
            nuevo_campo = Campo.objects.create(formulario=formulario, nombre=nombre, tipo=tipo)
            
            # Procesar opciones solo si el campo es de tipo 'select' o 'checkbox'
            if tipo in ['select', 'checkbox']:
                opciones_nombres = request.POST.getlist('opcion_nombre[]')
                opciones_valores = request.POST.getlist('opcion_valor[]')
                for nombre_opcion, valor_opcion in zip(opciones_nombres, opciones_valores):
                    if nombre_opcion and valor_opcion:
                        Opcion.objects.create(campo=nuevo_campo, nombre=nombre_opcion, valor=valor_opcion)

        elif 'eliminar' in request.POST:
            campo_id = request.POST.get('campo_id')
            Campo.objects.get(id=campo_id).delete()
    
    return render(request, 'director/gestionar_campos.html', {'formulario': formulario, 'campos': campos})

def ver_formularios(request):
    formularios = Formulario.objects.all()
    return render(request, 'director/ver_formularios.html', {'formularios': formularios})

def activar_formulario(request, formulario_id):
    if request.method == 'POST':
        formulario = Formulario.objects.get(id=formulario_id)
        formulario.activo = True
        formulario.save()
        return redirect('director:ver_formularios')

