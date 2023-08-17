from django.contrib import admin
from .models import Customer,User,Goal,cart,CartItem,order,orderItems
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'password','email', 'firstname','lastname','role','CustomerId')
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'password','email', 'firstname','lastname','role')
class GoalAdmin(admin.ModelAdmin):
    list_display = ('CustomerId', 'GoalId','title','Finished','comment','dueDate')
class cartAdmin(admin.ModelAdmin):
    list_display = ('CustomerId', 'cartId')
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cartId', 'product','quantity')
class orderAdmin(admin.ModelAdmin):
    list_display = ('id','CustomerId','totalPrice','orderDate')

admin.site.register(Customer,CustomerAdmin)
admin.site.register(User,UserAdmin)
admin.site.register(Goal,GoalAdmin)
admin.site.register(cart,cartAdmin)
admin.site.register(CartItem,CartItemAdmin)
admin.site.register(order,orderAdmin)
admin.site.register(orderItems)
