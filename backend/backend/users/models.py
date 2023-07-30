from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True, null=False)
    email = models.EmailField(unique=True, null=True, blank=True)
    def __str__(self):
        return self.email
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
    firstname=models.CharField(max_length=200, null=False)
    lastname=models.CharField(max_length=200, null=False)
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
