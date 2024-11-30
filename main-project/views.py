from django.shortcuts import render
from django.views.generic import TemplateView

def login(request):
    return render(request, 'login/build/index.html')

def departamentoObra(request):
    return render(request, 'departamentoObras/dist/index.html')