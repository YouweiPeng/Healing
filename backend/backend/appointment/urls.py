from django.urls import path
from .views import get_appointments, create_appointment,get_appointment_all

urlpatterns = [
    path('get_appointments/', get_appointments, name='get_appointments'),
    path('create_appointment/', create_appointment, name='create_appointment'),
    path('get_appointment_all/', get_appointment_all, name='get_appointment_all'),
]