from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone
from .models import Campo, Opcion, Formulario
from gestor_territorial.models import Incidencia
from cuenta.models import Usuario
#from administrador.models import registroAuditoria
import folium



def dashboard(request):
    # Filtrar incidencias con estado 'iniciada'
    incidencias = Incidencia.objects.filter(estado='iniciada')
    usuarios_departamento = Usuario.objects.filter(rol='Departamento de obras')
    print(incidencias)
    # Crear el mapa inicial centrado en una ubicación predeterminada
    initial_map = folium.Map(location=[-33.427656074857076, -70.61159044504167], zoom_start=9)

    # Añadir marcadores para cada incidencia
    for incidencia in incidencias:
        print(incidencia.multimedia_gestor.url if incidencia.multimedia_gestor else "Sin multimedia")
        if incidencia.latitud and incidencia.longitud:  # Verificar que las coordenadas existan
            coordinates = (incidencia.latitud, incidencia.longitud)
            popup_content = f'''
                <b>Nombre:</b> {incidencia.titulo_Incidencia}<br>
                <b>Urgencia:</b> {incidencia.get_urgencia_display()}<br>
                <b>Estado:</b> {incidencia.get_estado_display()}
            '''
            folium.Marker(
                location=coordinates,
                popup=folium.Popup(popup_content, max_width=300),
                tooltip="Haz clic para más información"
            ).add_to(initial_map)

    # Renderizar la plantilla con el QuerySet de incidencias y el HTML del mapa
    context = {
        'usuarios_departamento': usuarios_departamento,
        'incidencias': incidencias,  # Pasa las incidencias al template
        'map': initial_map._repr_html_()  # Mapa convertido a HTML para insertar en el template
    }
    return render(request, 'director/dashboard.html', context)

def incidencias(request):
    incidencia = Incidencia.objects.all()
    usuarios = Usuario.objects.filter(rol='dep')
    return render(request,'director/incidencias.html',{'incidencia':incidencia, 'usuarios':usuarios})


def asignarUsuario (request):
    id_incidencia = request.POST.get('ID_asignar')

    usuario_id = request.POST.get('usuario_id')

    incidencia = Incidencia.objects.get(id=id_incidencia)
    incidencia.id_usuario_departamento = usuario_id
    incidencia.estado = 'Asignada'
    incidencia.save()

    return redirect('director:incidencias')

def deshacerAsignacion(request,id):

    incidencia = Incidencia.objects.get(id=id)
    incidencia.id_usuario_departamento = None
    incidencia.estado = 'iniciada'
    incidencia.save()

    return redirect('director:incidencias')


def rechazarIncidencia(request):

    id_incidencia = request.POST.get('ID_rechazo')
    id_incidencia1 = int(id_incidencia)


    justificacion = request.POST.get('justificacion')

    nombre_usuario = request.POST.get('user_rechazo')
    usuario = Usuario.objects.get(nombre = nombre_usuario)
    id_usuario = usuario.id_usuario

    fecha_asignacion = timezone.now()


    estado = 'rechazada'
    #registro = RegistroAuditoria.objects.create(idIncidencia = id_incidencia1,comentario = justificacion,estado = estado, id_usuario_id = id_usuario, fecha_asignacion = fecha_asignacion)

    incidencia = Incidencia.objects.get(id_incidencia=id_incidencia)
    incidencia.estado = 'rechazada'
    incidencia.resolutor_Asignado = 'none'
    incidencia.save()
    return redirect('director:incidencias')


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
