from django.db import models
from datetime import datetime
from rest_framework.parsers import FileUploadParser
from albumes.models import Album

# Create your models here.
def upload_path(instance, filename):
    fecha = datetime.today().strftime('%Y/%m/%d')
    return f'{instance.IdAlbum.id}/{fecha}/{filename}'

class Foto(models.Model):
    """Model definition for Foto."""
    parser_class = (FileUploadParser,)
    IdAlbum = models.ForeignKey(Album, related_name='fotos', on_delete=models.CASCADE)
    Caption = models.CharField(max_length=255)
    imagen = models.ImageField(upload_to=upload_path)
    DateOfCreation = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Foto."""

        verbose_name = 'Foto'
        verbose_name_plural = 'Fotos'

    def __str__(self):
        """Unicode representation of Foto."""
        return self.Caption
