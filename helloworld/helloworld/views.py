from django.http import HttpResponse
from django.shortcuts import render
def Homepage(request):
    user = "Tayef"
    return render(request, 'index.html', {"data":user})
def firstpage(request):
    if request.method == "POST":
        num1 = request.POST['number1']
        num2 = request.POST['number2']
        result = int(num2)+int(num1)
        data = {
            "num1": num1,
            "num2": num2,
            "result": result,
        }
        return render(request, 'index.html', {"formdata": data})