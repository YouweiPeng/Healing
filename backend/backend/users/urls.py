from django.urls import path
from .views import create_customer,get_customers,get_goal,create_goal,update_goal,delete_goal,get_cart,create_cart,add_to_cart,get_cart_items,get_cart_items_by_cart,update_cart_items,delete_cart_item

urlpatterns = [
    path('create_customer/', create_customer, name="create_customer"),
    path('get_customers/', get_customers, name="get_customers"),
    path('get_goal/', get_goal, name="get_goal"),
    path('create_goal/', create_goal, name="create_goal"),
    path('update_goal/', update_goal, name="update_goal"),
    path('delete_goal/<str:pk>/', delete_goal, name="delete_goal"),
    path('get_cart/', get_cart, name="get_cart"),
    path('create_cart/', create_cart, name="create_cart"),
    path('add_to_cart/', add_to_cart, name="add_to_cart"),
    path('get_cart_items/', get_cart_items, name="get_cart_items"),
    path('get_cart_items_by_cart/', get_cart_items_by_cart, name="get_cart_items_by_cart"),
    path('update_cart_items/', update_cart_items, name="update_cart_items"),
    path('delete_cart_item/', delete_cart_item, name="delete_cart_item"),
]
    