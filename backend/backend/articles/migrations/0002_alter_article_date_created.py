# Generated by Django 4.1.5 on 2023-07-31 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
