# Generated by Django 4.1.5 on 2023-07-30 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customer_alter_user_role_goal_customer_goals'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='username',
            field=models.CharField(default='username', max_length=200),
        ),
    ]
