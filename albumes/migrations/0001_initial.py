# Generated by Django 3.0.3 on 2020-02-15 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=255)),
                ('Cover', models.CharField(choices=[('S', 'Soft cover'), ('H', 'Hard cover')], default='S', max_length=2)),
                ('DateOfCreation', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Album',
                'verbose_name_plural': 'Albums',
            },
        ),
    ]
