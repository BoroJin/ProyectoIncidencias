#maxi
from django.db import IntegrityError
from django.shortcuts import render, redirect, get_object_or_404
from .models import Logo,Incidencia, RegistroAuditoria  # Suponiendo que tienes un modelo llamado Usuario
from django.contrib import messages
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ConfiguracionMunicipalidadSerializer
import csv
from django.http import JsonResponse, Http404
from django.http import HttpResponse
from cuenta.models import Usuario, Ticket
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import RegistroAuditoria, Usuario, Incidencia
from django.core.paginator import Paginator

def adm_principal(request):
    global user_id, user_name
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')
    return render(request, 'administrador/Adm_principal.html', {'user_name': user_name})

def adm_ticket(request):
    tickets = Ticket.objects.select_related('usuario').all()  # Incluye datos del usuario relacionado
    return render(request, 'administrador/Adm_ticket.html', {'tickets': tickets,'user_name': user_name})

def adm_gestion_usuarios(request):
    if request.method == 'POST':  # Si es un POST, significa que el formulario fue enviado
        nombre = request.POST['nombre']
        correo = request.POST['correo']
        rol = request.POST['rol']
        
        # Crear un nuevo usuario
        nuevo_usuario = Usuario(nombre=nombre, correo_electronico=correo, rol=rol)
        nuevo_usuario.save()
        
        messages.success(request, 'Usuario agregado exitosamente')
        return redirect('adm_gestion_usuarios')

    # Obtener todos los usuarios de la base de datos
    usuarios = Usuario.objects.all()

    return render(request, 'administrador/Adm_gestion_usuarios.html', {'usuarios': usuarios,'user_name': user_name})

def adm_cargar_masiva(request):
    return render(request, 'administrador/Adm_cargar_masiva.html',{'user_name': user_name})

def adm_actualizar_logo(request):
    logo = Logo.objects.first()

    # Si no existe un logo en la base de datos, crea uno vacío
    if logo is None:
        logo = Logo.objects.create()  # Crea un logo con valores por defecto

    if request.method == 'POST':
        nombre_municipalidad = request.POST.get('nombre_municipalidad')
        
        # Si se sube un nuevo archivo de imagen
        if request.FILES.get('imagen'):
            logo.imagen = request.FILES['imagen']
        
        logo.nombre_municipalidad = nombre_municipalidad
        logo.save()

        messages.success(request, 'El nombre y el logo de la municipalidad se han actualizado.')
        return redirect('adm_principal')

    context = {
        'form': logo,  # Pasamos el objeto `logo` que contiene el nombre y la imagen actuales
        'user_name': user_name
    }
    return render(request, 'administrador/Adm_actualizar_logo.html', context)

def eliminar_usuario(request, usuario_id):
    if request.method == 'POST':
        usuario = get_object_or_404(Usuario, id=usuario_id)
        usuario.delete()
        messages.success(request, 'Usuario eliminado correctamente.')
    return redirect('adm_gestion_usuarios')  # Redirige de vuelta a la gestión de usuarios

def editar_usuario(request, usuario_id):
    usuario = get_object_or_404(Usuario, id=usuario_id)
    
    if request.method == 'POST':
        usuario.nombre = request.POST['nombre']
        usuario.correo_electronico = request.POST['correo']
        usuario.rol = request.POST['rol']
        usuario.password = request.POST.get('password')

        usuario.save()
        
        messages.success(request, 'Usuario actualizado correctamente.')
        return redirect('adm_gestion_usuarios')
    
    return render(request, 'administrador/Adm_gestion_usuarios.html', {'usuario': usuario, 'user_name': user_name})

class ConfiguracionMunicipalidadView(APIView):
    def get(self, request):
        configuracion = Logo.objects.first()
        serializer = ConfiguracionMunicipalidadSerializer(configuracion)
        return Response(serializer.data)
      
def importar_usr_vista(request):
    return render(request, 'administrador/importar_usr_vista.html',{'user_name': user_name})

def exportar_usr_vista(request):
    return render(request, 'administrador/exportar_usr_vista.html',{'user_name': user_name})

    # De esta funcion, se espera recibir un archivo csv, validar que el que el archivo este correcto
def recibir_y_validar_csv(request):
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            archivo = request.FILES.get('file')
            fs = FileSystemStorage()
            nombre_archivo = fs.save(archivo.name, archivo)
            ruta_completa_archivo = fs.path(nombre_archivo)
            request.session['ruta_completa_archivo'] = ruta_completa_archivo
            
            # Validar el archivo CSV
            es_valido, resultado = validar_csv_entrada(ruta_completa_archivo)
            if not es_valido:
                return JsonResponse({'mensaje': 'Errores en el archivo CSV', 'detalles': resultado}, status=400)
            else:
                return JsonResponse({'mensaje': f"{resultado}. ¿Desea continuar?"}, status=200)
            
        except csv.Error:
            return JsonResponse({'mensaje': 'El archivo no es un CSV válido.'}, status=400)
        except IOError:
            return JsonResponse({'mensaje': 'Error al leer el archivo. Verifique los permisos.'}, status=500)
        except Exception as e:
            return JsonResponse({'mensaje': f'Ocurrió un error inesperado: {str(e)}'}, status=500)
    
    return JsonResponse({'mensaje': 'Método no permitido'}, status=405)


    #Quiero hacer que cuando suba el archivo, me cuente los usuarios validos para agregar, en un popup
    #Luego en el mismo popup quiero me pregunte si deseoo continuar,
    # Usted esta apunto de agregar x usuarios nuevos al sistema, desea continuar ? 
    # presione confirmar"
    #Luego de confirmar esto, quiero que se redirija a "Adm_cargar_masiva.html", con un mensaje que diga(no popup) "x usuarios creados con exito"
    #Si no tuvo exito, que notifique el error en este mensaje
    
    # Esta funcion busca leer la tabla de usuarios y escribirlos en un csv, y retortnar el csv para descargar
def exportar_csv(request):
    # Crea la respuesta como archivo CSV
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="usuarios.csv"' #Indica que debe tratarse como una descarga
    #Inicializa el writer para escribir en CSV
    writer = csv.writer(response)
    # Encabezados del CSV
    writer.writerow(['usuario', 'contrasena','correo','rol'])
    usuarios = Usuario.objects.all()
    for usuario in usuarios:
        # Escribe cada usuario en el archivo CSV
        writer.writerow([usuario.nombre,usuario.password,usuario.correo_electronico,usuario.rol])
    return response #Retorna el csv para descargar

    # #Esta funcion busca validar nombres de usuarios, en aspectos como:
    #- nombre de usuario:
    #   - Longitud, entre maxima y minima
    #   - Solo permite caracteres y numeros
    #   - Disponibilidad, busca que no exista este usuario en la base de datos
    #- Correo 
    #    -Si es que tiene arroba
    #    -Si tiene un punto luego del arroba
    # - Rol
    #    -Que el rol, sea valido (Administrador)(Gestor Territorial)(Director)(Departamento de obras)(Resolutor)
def validar_csv_entrada(ruta,longitud_max=1000,longitud_min=3):
    #Obtener una lista de los usuarios en uso
    usuarios_en_uso = Usuario.objects.values_list('nombre', flat=True)
    errores = []
    try:
        with open(ruta, 'r') as file:
            contenido = file.readlines()
            num_lineas = len(contenido) - 1 #Ignoramos la cabecera
            contenido.pop(0)  # Elimina la cabecera del archivo CSV
            for index, linea in enumerate(contenido, start=1):  # Inicia en 2 para compensar cabecera
                usuario = linea.strip().split(",") # Strip elimina los saltos de lineas y espacios en blanco
                
                # Validar nombre de usuario
                if not (longitud_min <= len(usuario[0]) <= longitud_max and usuario[0].isalnum()):
                    errores.append(f"Error en línea {index}: Nombre de usuario '{usuario[0]}' inválido.")
                
                # Validar correo
                if "@" not in usuario[2] or "." not in usuario[2].split("@")[1]:
                    errores.append(f"Error en línea {index}: Correo '{usuario[2]}' inválido.")
                
                # Validar rol
                roles_validos = ["Administrador", "Gestor Territorial", "Director", "Departamento de obras", "Resolutor"]
                if usuario[3] not in roles_validos:
                    errores.append(f"Error en línea {index}: Rol '{usuario[3]}' no es válido.")
                
                # Validar disponibilidad del usuario
                if usuario[0] in usuarios_en_uso:
                    errores.append(f"Error en línea {index}: El usuario '{usuario[0]}' ya está en uso.")
                
            if errores:
                return False, errores
            else:
                    return True, f"El CSV es válido. Se agregarán {num_lineas} usuarios nuevos."
    except Exception as e:
        return False, [f"Error inesperado al procesar el archivo: {str(e)}"]
    
def agregar_usuarios_desde_csv(request):
    if request.method == 'POST':
        # Obtener la ruta del archivo CSV desde la sesión, se guarda en la session en la funcion recibir_y_validar_csv 
        ruta_csv = request.session.get('ruta_completa_archivo')
        if not ruta_csv:
            return JsonResponse({'mensaje': 'No se encontró el archivo a procesar.'}, status=400)

        errores = []
        usuarios_agregados = 0
        try:
            with open(ruta_csv, 'r') as file:
                contenido = file.readlines()
                contenido.pop(0)  # Elimina la cabecera

                for index, linea in enumerate(contenido, start=1):
                    usuario_data = linea.strip().split(",")
                    nombre, password, correo, rol = usuario_data[0], usuario_data[1], usuario_data[2], usuario_data[3]

                    # Crea y guarda el nuevo usuario
                    try:
                        nuevo_usuario = Usuario(nombre=nombre, password=password, correo_electronico=correo, rol=rol)
                        nuevo_usuario.save()
                        usuarios_agregados += 1
                    except IntegrityError:
                        errores.append(f"Línea {index}: Error de integridad al agregar el usuario '{nombre}'.")
                    except Exception as e:
                        errores.append(f"Línea {index}: Error inesperado al agregar usuario '{nombre}': {str(e)}")
            # Eliminar archivo temporal después de procesar
            fs = FileSystemStorage()
            fs.delete(ruta_csv)
            del request.session['ruta_completa_archivo']  # Elimina la ruta de la sesión

            if errores:
                return JsonResponse({'mensaje': f"Se agregaron {usuarios_agregados} usuarios, pero ocurrieron errores.", 'detalles': errores}, status=207)
            return JsonResponse({'mensaje': f"Se han agregado {usuarios_agregados} usuarios correctamente."}, status=200)
        
        except csv.Error:
            return JsonResponse({'mensaje': 'Error al leer el archivo CSV.'}, status=400)
        except Exception as e:
            return JsonResponse({'mensaje': f'Error inesperado: {str(e)}'}, status=500)
    
    return JsonResponse({'mensaje': 'Método no permitido'}, status=405)

def crear_registro_auditoria(datos):
    usuario_id = datos.get('usuario_id')
    incidencia_id = datos.get('incidencia_id')
    estado_anterior = datos.get('estado_anterior')
    estado_actual = datos.get('estado_actual')
    comentario = datos.get('comentario', '')

    usuario = get_object_or_404(Usuario, id=usuario_id)
    incidencia = get_object_or_404(Incidencia, id=incidencia_id)

    # Verificar que el estado actual sea válido
    estados_validos = dict(Incidencia.ESTADO_CHOICES).keys()
    if estado_actual not in estados_validos:
        return JsonResponse({'error': 'Estado actual no válido'}, status=400)
    if estado_anterior and estado_anterior not in estados_validos:
        return JsonResponse({'error': 'Estado anterior no válido'}, status=400)

            
    registro = RegistroAuditoria.objects.create(
        idUsuario=usuario,
        idIncidencia=incidencia,
        estado_anterior=estado_anterior,
        estado_actual=estado_actual,
        comentario=comentario
            )

    return JsonResponse({
        'message': 'Registro de auditoría creado con éxito',
        'registro_id': registro.idRegistro
        }, status=201)

def registros_de_incidencia(request, incidencia_id):
    try:
        incidencia = Incidencia.objects.get(pk=incidencia_id)
    except Incidencia.DoesNotExist:
        raise Http404("Incidencia no encontrada")

    registros_auditoria = incidencia.registros_auditoria.select_related('idUsuario').all().order_by('fecha_cambio')
    registros = [
        {
            'idRegistro': registro.idRegistro,
            'idUsuario': registro.idUsuario.nombre,
            'estado_anterior': registro.get_estado_anterior_display(),
            'estado_actual': registro.get_estado_actual_display(),
            'comentario': registro.comentario,
            'fecha_cambio': registro.fecha_cambio.strftime('%Y-%m-%d %H:%M:%S'),
        }
        for registro in registros_auditoria
    ]
    data = {
        'idIncidencia': incidencia.id,
        'titulo': incidencia.titulo_Incidencia,
        'fecha_reporte': incidencia.fecha_Reporte.strftime('%Y-%m-%d %H:%M:%S'),
        'estado_actual': incidencia.estado,
        'registros': registros
    }
    return JsonResponse(data)



def registro_auditoria(request):
    user_id = request.COOKIES.get('user_id')
    user_name = request.COOKIES.get('user_name')
    
    # Obtener todas las incidencias con sus registros de auditoría
    incidencias = Incidencia.objects.prefetch_related('registros_auditoria').all()
    
    # Paginación: Mostrar 10 incidencias por página
    paginator = Paginator(incidencias, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    # Convertimos las incidencias en un formato que incluya la fecha de reporte
    incidencias_data = [
        {
            'id': incidencia.id,
            'titulo': incidencia.titulo_Incidencia,
            'estado': incidencia.get_estado_display(),
            'urgencia': incidencia.get_urgencia_display(),
            'fecha_reporte': incidencia.fecha_Reporte.strftime('%Y-%m-%d %H:%M:%S'),
        }
        for incidencia in page_obj
    ]
    
    return render(request, 'administrador/registroAuditoria.html', {
        'page_obj': incidencias_data,
        'user_name': user_name,
    })
