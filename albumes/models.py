from django.db import models

SOFT = 'S'
HARD = 'H'
COVER_CHOICES = [
    (SOFT, 'Soft cover'),
    (HARD, 'Hard cover'),
    ]

# Create your models here.
class Album(models.Model):
    """Model definition for Album."""
    Title = models.CharField(max_length=255)
    Cover = models.CharField(max_length=2, choices=COVER_CHOICES, default=SOFT)
    DateOfCreation = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Album."""

        verbose_name = 'Album'
        verbose_name_plural = 'Albums'

    def __str__(self):
        """Unicode representation of Album."""
        return self.Title
