# Generated by Django 4.1.5 on 2023-07-29 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='../images/testProduct.png', null=True, upload_to=''),
        ),
    ]
