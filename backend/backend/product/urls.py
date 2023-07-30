from django.urls import path
from .views import getProducts

urlpatterns = [
    path('products/', getProducts, name="products"),
]