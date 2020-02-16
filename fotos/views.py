from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Foto
from .serializers import FotoSerializer

class FotoViewset(ModelViewSet):
    queryset = Foto.objects.all()
    serializer_class = FotoSerializer
    
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]
            if isinstance(data, list):
                kwargs["many"] = True
        return super(ModelViewSet, self).get_serializer(*args, **kwargs)


# Create your views here.
