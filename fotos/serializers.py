from rest_framework.serializers import ModelSerializer
from .models import Foto

class FotoSerializer (ModelSerializer):
    class Meta:
        model = Foto
        fields = '__all__'
