from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Album
from .serializers import AlbumSerializer

class AlbumViewset(ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]
            if isinstance(data, list):
                kwargs["many"] = True
        return super(ModelViewSet, self).get_serializer(*args, **kwargs)
