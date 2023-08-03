from django.urls import path
from .views import getProducts,getSingleProduct

urlpatterns = [
    path('products/', getProducts, name="products"),
    path('product/<str:pk>/', getSingleProduct, name="product"),
]