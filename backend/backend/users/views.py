from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import Customer
from .serializers import CustomerSerializer

@api_view(['POST'])
def create_customer(request):
    serializer = CustomerSerializer(data=request.data)
    print(request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_customers(request,pk):
    if request.method == 'GET':
        customers = Customer.objects.filter(email=pk)
        if customers.exists():
            serializer = CustomerSerializer(customers)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response("Customer not found",status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def delete_customer(request, pk):
    customer = Customer.objects.get(id=pk)
    customer.delete()
    return Response('Customer deleted successfully', status=status.HTTP_200_OK)
