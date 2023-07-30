from django.urls import path
from .views import create_customer,get_customers

urlpatterns = [
    path('create_customer/', create_customer, name="create_customer"),
    path('get_customers/<str:pk>/', get_customers, name="get_customers"),
]
    