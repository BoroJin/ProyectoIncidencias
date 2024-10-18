from django.shortcuts import render

def dashboard_resolutor(request):
    return render(request, 'resolutor/dashboard_resolutor.html')
