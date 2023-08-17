from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import Customer,User,Goal,cart,CartItem,order,orderItems
from .serializers import CustomerSerializer,UserSerializer,GoalSerializer,cartSerializer,CartItemSerializer,orderSerializer,orderItemsSerializer
from rest_framework.views import APIView

@api_view(['POST'])
def create_customer(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_customers(request):
    if request.method == 'GET':
        email = request.query_params.get('email')
        password = request.query_params.get('password')

        try:
            user = User.objects.get(email=email, password=password)
            serializer = UserSerializer(user)
            if user.role == 'CUSTOMER':
                customer = Customer.objects.get(id=user.id)
                serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response("Login failed. Incorrect email or password.", status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
def get_customer_by_id(request):
    if request.method == 'GET':
        customer_id = request.query_params.get('CustomerId')

        try:
            user = Customer.objects.get(CustomerId=customer_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response("Login failed. Incorrect email or password.", status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def delete_customer(request, pk):
    customer = Customer.objects.get(id=pk)
    customer.delete()
    return Response('Customer deleted successfully', status=status.HTTP_200_OK)

@api_view(['GET'])
def get_goal(request):
    if request.method == 'GET':
        customer_id = request.query_params.get('CustomerId')
        try:
            goal = Goal.objects.filter(CustomerId=customer_id)
            serializer = GoalSerializer(goal, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Goal.DoesNotExist:
            return Response("No goals found for this customer.", status=status.HTTP_404_NOT_FOUND)
        
@api_view(['POST'])
def create_goal(request):
    if request.method == 'POST':
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("Goal creation failed.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH'])
def update_goal(request):
    if request.method == 'PATCH':
        goal_id = request.data["GoalId"]
        goal = Goal.objects.get(GoalId=goal_id)
        if goal is None:
            return Response("Goal update failed.", status=status.HTTP_400_BAD_REQUEST)
        goal.Finished=True
        goal.save()
        return Response(status=status.HTTP_200_OK)
@api_view(['DELETE'])
def delete_goal(request, pk):
    goal = Goal.objects.get(GoalId=pk)
    goal.delete()
    return Response('Goal deleted successfully', status=status.HTTP_200_OK)

@api_view(['GET'])
def get_cart(request):
    if request.method == 'GET':
        customer_id = request.query_params.get('CustomerId')
        try:
            Cart = cart.objects.filter(CustomerId=customer_id)
            serializer = cartSerializer(Cart, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except cart.DoesNotExist:
            return Response("No cart found for this customer.", status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_cart(request):
    if request.method == 'POST':
        serializer = cartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("cart creation failed.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def add_to_cart(request):
    if request.method == 'POST':
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            cart_id = request.data["cartId"]
            product_id = request.data["product"]
            cart_instance = cart.objects.get(cartId=cart_id)
            cart_item = CartItem.objects.filter(cartId=cart_id, product=product_id)
            print(cart_item)
            for item in cart_item:
                print(item)
                print(item.product)
                print(item.quantity)
                cart_instance.inCart.add(item)
                cart_instance.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("cart item creation failed.", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_cart_items(request):
    if request.method == 'GET':
        cart_id = request.query_params.get('cartId')
        product_id = request.query_params.get('product')
        try:
            cart_items = CartItem.objects.filter(cart=cart_id, product=product_id)
            serializer = CartItemSerializer(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except cart.DoesNotExist:
            return Response("No cart found for this customer.", status=status.HTTP_404_NOT_FOUND)
@api_view(['PATCH'])
def update_cart_items(request):
    if request.method == 'PATCH':
        cart_id = request.data["cartId"]
        product_id = request.data["product"]
        quantity = request.data["quantity"]
        cart_item = CartItem.objects.get(cartId=cart_id, product=product_id)
        if cart_item is None:
            return Response("cart item update failed.", status=status.HTTP_400_BAD_REQUEST)
        cart_item.quantity=quantity
        cart_item.save()
        serializer=CartItemSerializer(cart_item)
        return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
def get_cart_items_by_cart(request):
    if request.method == 'GET':
        cart_id = request.query_params.get('cartId')
        print("This is get_cart_items_by_cart "+cart_id)
        try:
            cart_items = CartItem.objects.filter(cart=cart_id)
            serializer = CartItemSerializer(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except cart.DoesNotExist:
            return Response("No cart found for this customer.", status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_cart_item(request):
    cart_id = request.query_params.get('cartId')
    product_id = request.query_params.get('product')
    cart_item = CartItem.objects.get(cartId=cart_id, product=product_id)
    if cart_item is None:
        print("cart item is none")
        return Response("cart item update failed.", status=status.HTTP_400_BAD_REQUEST)
    cart_item.delete()
    return Response('Cart item deleted successfully', status=status.HTTP_200_OK)
@api_view(['DELETE'])
def clear_cart(request):
    cart_id = request.query_params.get('cartId')
    cart_items = CartItem.objects.filter(cartId=cart_id)
    if cart_items is None:
        print("cart item is none")
        return Response("cart item update failed.", status=status.HTTP_400_BAD_REQUEST)
    cart_items.delete()
    return Response('Cart is clear', status=status.HTTP_200_OK)
@api_view(['GET'])
def get_order_all(request):
    if request.method == 'GET':
        try:
            orders = order.objects.all()
            serializer = orderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except order.DoesNotExist:
            return Response("No orders found.", status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
def get_order_by_user(request):
    if request.method == 'GET':
        customer_id = request.query_params.get('CustomerId')
        try:
            orders = order.objects.filter(CustomerId=customer_id)
            serializer = orderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except order.DoesNotExist:
            return Response("No orders found.", status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def post_order(request):
    if request.method == 'POST':
        serializer = orderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("order creation failed.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_orderItem(request):
    if request.method == 'GET':
        order_id = request.query_params.get('orderId')
        print(order_id)
        try:
            order_Items = orderItems.objects.filter(order=order_id)
            serializer = orderItemsSerializer(order_Items, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except orderItems.DoesNotExist:
            return Response("No orderItems found.", status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def post_orderItem(request):
    if request.method == 'POST':
        serializer = orderItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("orderItems creation failed.", status=status.HTTP_400_BAD_REQUEST)