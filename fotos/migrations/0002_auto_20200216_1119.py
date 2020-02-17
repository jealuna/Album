# Generated by Django 3.0.3 on 2020-02-16 17:19

from django.db import migrations, models
import django.db.models.deletion
import fotos.models


class Migration(migrations.Migration):

    dependencies = [
        ('albumes', '0001_initial'),
        ('fotos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foto',
            name='IdAlbum',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fotos', to='albumes.Album'),
        ),
        migrations.AlterField(
            model_name='foto',
            name='imagen',
            field=models.ImageField(upload_to=fotos.models.upload_path),
        ),
    ]