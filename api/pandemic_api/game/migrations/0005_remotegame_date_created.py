# Generated by Django 3.0.6 on 2020-06-23 20:04

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_auto_20200618_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='remotegame',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
