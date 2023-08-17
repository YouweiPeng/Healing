from rest_framework import serializers
from users.models import Customer,User,Goal,cart,CartItem,order,orderItems

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'password','email', 'firstname','lastname','role','CustomerId'] 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'password','email', 'firstname','lastname','role']
class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['CustomerId', 'GoalId','title','Finished','comment','dueDate']
class cartSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = ['CustomerId', 'cartId','inCart']
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['cartId', 'product','quantity']
class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = order
        fields = ['id','CustomerId','totalPrice','orderDate']
class orderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = orderItems
        fields = ['order', 'product', 'quantity']

    