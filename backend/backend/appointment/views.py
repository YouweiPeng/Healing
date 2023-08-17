from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Appointment
from .serializers import AppointmentSerializer

@api_view(['GET'])
def get_appointments(request):
    if request.method == 'GET':
        email = request.query_params.get('email')
        customer_id = request.query_params.get('CustomerId')
        try:
            appointment = Appointment.objects.filter(email=email, CustomerId=customer_id)
            serializer = AppointmentSerializer(appointment, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response("No appointments found for this customer.", status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def create_appointment(request):
    if request.method == 'POST':
        print(request.data)
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("Appointment creation failed.", status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_appointment_all(request):
    if request.method == 'GET':
        try:
            appointment = Appointment.objects.all()
            serializer = AppointmentSerializer(appointment, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response("No appointments found for this customer.", status=status.HTTP_404_NOT_FOUND)