from rest_framework import viewsets
from .models import Tickets
from .serializer import TicketsSerializer
from .serializer import MensajeSerializer
from .models import Mensaje

class TicketsViewSet(viewsets.ModelViewSet):
    queryset = Tickets.objects.all()
    serializer_class = TicketsSerializer

class MensajeViewSet(viewsets.ModelViewSet):
    queryset = Mensaje.objects.all()
    serializer_class = MensajeSerializer