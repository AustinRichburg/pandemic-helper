# Generated by Django 3.0.6 on 2020-06-18 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_remotegame'),
    ]

    operations = [
        migrations.AlterField(
            model_name='remotegame',
            name='id',
            field=models.CharField(max_length=6, primary_key=True, serialize=False, unique=True),
        ),
    ]