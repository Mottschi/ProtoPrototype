from django.db import models

# Create your models here.

class Benutzerkonto(models.Model):
	id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=20)
	first_name = models.CharField(max_length=20)
	last_name = models.CharField(max_length=20)