from django.db import models

# Create your models here.
class Voicenote(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=20)
	audio = models.BinaryField()