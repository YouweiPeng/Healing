from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from datetime import datetime
class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True, null=False)
    email = models.EmailField(unique=True, null=True, blank=True)
    firstname=models.CharField(max_length=200, null=False,default="defualt_firstname")
    lastname=models.CharField(max_length=200, null=False, default="defualt_lastname")
    def __str__(self):
        return self.firstname+"  "+self.role
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER = "CUSTOMER", "Customer"
    base_role = Role.ADMIN
    USERNAME_FIELD = 'email'
    role = models.CharField(max_length=50, choices=Role.choices, default=base_role)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
        return super().save(*args, **kwargs)

class CustomerManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.CUSTOMER)

class Customer(User):
    base_role = User.Role.CUSTOMER
    CustomerId = models.AutoField(primary_key=True, null=False)
    goals = models.ManyToManyField('users.Goal', blank=True)
    objects = CustomerManager()
    def __str__(self):
        return self.firstname + " " + self.lastname

class Goal(models.Model):
    CustomerId = models.ForeignKey(Customer, on_delete=models.CASCADE)
    GoalId = models.AutoField(primary_key=True, null=False)
    title = models.CharField(max_length=200)
    Finished = models.BooleanField(default=False)
    comment = models.CharField(max_length=200,default="no comment")
    dueDate = models.DateField(null=False)
    def __str__(self):
        return self.title

class cart(models.Model):
    CustomerId = models.ForeignKey(Customer, on_delete=models.CASCADE)
    cartId = models.AutoField(primary_key=True, null=False)
    inCart = models.ManyToManyField('users.CartItem', blank=True)
    def __str__(self):
        return self.CustomerId.firstname + " " + self.CustomerId.lastname + "'s cart"

class CartItem(models.Model):
    cart_item_id = models.AutoField(primary_key=True)
    cartId = models.ForeignKey(cart, on_delete=models.CASCADE)
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

class order(models.Model):
    CustomerId = models.ForeignKey(Customer, on_delete=models.CASCADE)
    totalPrice=models.FloatField(null=False)
    orderDate=models.DateTimeField(null=False,default=datetime.now)
    def __str__(self):
        return self.CustomerId.firstname + " " + self.CustomerId.lastname + "'s order"

class orderItems(models.Model):
    order = models.ForeignKey(order, on_delete=models.CASCADE)
    product = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    def __str__(self):
        return  self.product + " of " + str(self.quantity) + " " + "items"
