from django.shortcuts import render

def ver_gestor(request):
    return render(request, 'gestor_territorial/gestor_territorial.html')

def ver_listaIncidencias(request):
    return render(request, 'gestor_territorial/lista_incidencias.html')

