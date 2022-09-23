from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
	return HttpResponse("Hallo Welt!")

def index_mit_template(request):
	context = {'title': 'Hallo Welt App',
				'empfaenger': 'Welt',
	}
	return render(request, 'myprototype/index.html', context)