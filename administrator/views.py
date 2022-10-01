from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

from betreiber.models import Benutzerkonto

def index(request):
	if request.method == 'GET':
		return render(request, 'administrator/index.html')
	else:
		username = request.POST['username']
		first_name = request.POST['vorname']
		last_name = request.POST['nachname']
		neues_konto = Benutzerkonto(username=username, first_name=first_name, last_name=last_name)
		print(neues_konto)
		neues_konto.save()

		return render(request, 'administrator/index.html')