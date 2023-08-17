from django.urls import path
from .views import getProducts,getSingleProduct,createProduct,updateProduct,deleteProduct

urlpatterns = [
    path('products/', getProducts, name="products"),
    path('product/<str:pk>/', getSingleProduct, name="product"),
    path('create_product/', createProduct, name="create_product"),
    path('update_product/<str:pk>/', updateProduct, name="update_product"),
    path('delete_product/<str:pk>/', deleteProduct, name="delete_product"),
]