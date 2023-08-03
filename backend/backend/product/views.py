from django.shortcuts import render
from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
@api_view(['GET'])
def getSingleProduct(request,pk):
    if request.method == 'GET':
        product = Product.objects.get(id=pk)
        print(product)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)
