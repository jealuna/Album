from django.db import models
from albumes.models import Album

# Create your models here.
class Foto(models.Model):
    """Model definition for Foto."""
    IdAlbum = models.ForeignKey(Album, on_delete=models.CASCADE)
    Caption = models.CharField(max_length=255)
    imagen = models.ImageField(upload_to='album/%Y/%m/%d/')
    DateOfCreation = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Foto."""

        verbose_name = 'Foto'
        verbose_name_plural = 'Fotos'

    def __str__(self):
        """Unicode representation of Foto."""
        pass
