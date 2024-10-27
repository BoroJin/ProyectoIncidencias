import csv

def validar_csv_entrada(ruta, longitud_max=8, longitud_min=3):
    # Obtener una lista de los usuarios en uso
    usuarios_en_uso = Usuario.objects.values_list('nombre', flat=True)
    
    with open(ruta, 'r') as file:
        contenido = file.read().splitlines()
        contenido.pop(0)  # Elimina el encabezado del CSV
        num_usuarios_agregar = 0

        for idx, linea in enumerate(contenido, start=2):  # Comienza en 2 considerando el encabezado
            usuario = linea.split(",")
            
            # Validar nombre de usuario
            if len(usuario[0]) > longitud_max or len(usuario[0]) <= longitud_min or not usuario[0].isalnum():
                return f"Error de formato en la línea {idx}: Nombre de usuario inválido"
            
            # Validar correo
            if "@" not in usuario[2]:
                return f"Error de formato en la línea {idx}: Correo sin '@'"
            email = usuario[2].split("@")
            if "." not in email[1]:
                return f"Error de formato en la línea {idx}: Dominio del correo sin '.'"
            
            # Validar rol
            roles_validos = ["Administrador", "Gestor Territorial", "Director", "Departamento de obras", "Resolutor"]
            if usuario[3] not in roles_validos:
                return f"Error de formato en la línea {idx}: Rol inválido"
            
            # Validar disponibilidad
            if usuario[0] in usuarios_en_uso:
                return f"Error de formato en la línea {idx}: Usuario en uso"
            
            # Si todo es válido, cuenta el usuario
            num_usuarios_agregar += 1

        # Si todo el archivo es válido
        return f"El CSV es correcto. Se agregarán {num_usuarios_agregar} usuarios."
