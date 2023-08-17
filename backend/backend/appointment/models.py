from django.db import models

class Appointment(models.Model):
    name=models.CharField(max_length=100)
    CustomerId=models.ForeignKey('users.Customer', on_delete=models.CASCADE)  #CustomerId = models.ForeignKey(Customer, on_delete=models.CASCADE)
    email=models.EmailField(max_length=100)
    problem=models.CharField(max_length=300)
    date=models.DateField()
    time=models.CharField(max_length=100)
    def __str__(self):
        return self.name + " 's' " + self.problem
