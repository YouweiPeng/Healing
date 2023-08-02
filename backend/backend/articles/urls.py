from django.urls import path
from .views import create_article,get_articles,update_article,delete_article

urlpatterns = [
    path('create_article/', create_article, name="create_article"),
    path('get_articles/', get_articles, name="get_articles"),
    path('update_article/<str:pk>/', update_article, name="update_article"),
    path('delete_article/<str:pk>/', delete_article, name="delete_article"),
]