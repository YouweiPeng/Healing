from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    price = models.FloatField(null=True)
    description = models.CharField(max_length=200, null=True)
    image = models.ImageField(null=True, blank=True,default='/testProduct.png')
    stock = models.IntegerField(null=True)
    def __str__(self):
        return self.name
