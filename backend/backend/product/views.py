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
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
@api_view(['POST'])
def createProduct(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response("Product creation failed.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PACTH'])
def updateProduct(request,pk):
    if request.method == 'PATCH':
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(instance=product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response("Product update failed.", status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteProduct(request,pk):
    if request.method == 'DELETE':
        product = Product.objects.get(id=pk)
        product.delete()
        return Response("Product deleted successfully.", status=status.HTTP_200_OK)