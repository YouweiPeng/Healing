from rest_framework import serializers
from users.models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'password','email', 'firstname','lastname','role']  # Include other fields as needed
        extra_kwargs = {'password': {'write_only': True}}