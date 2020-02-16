from rest_framework.serializers import ModelSerializer
from fotos.serializers import FotoSerializer
from .models import Album

class AlbumSerializer (ModelSerializer):
    fotos = FotoSerializer(many=True, read_only=True)
    class Meta:
        model = Album
        fields = ['id', 'Title', 'Cover', 'DateOfCreation', 'fotos']

