from django.http import HttpResponse
from django.shortcuts import render

from .models import Benutzerkonto

# Create your views here.
def index(request):
	konten = Benutzerkonto.objects.all()

	return render(request, 'betreiber/index.html', {'empfaenger': 'Betreiber',
													'title': 'Betreiberseite',
													'konten': konten})