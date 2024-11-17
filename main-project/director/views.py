from django.shortcuts import render, redirect, get_object_or_404
from .models import Campo, Opcion, Formulario
from gestor_territorial.models import Incidencia

def home(request):
    incidencias = Incidencia.objects.all().order_by('-fecha_Reporte')
    return render(request, 'director/home.html', {'incidencias': incidencias})

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

