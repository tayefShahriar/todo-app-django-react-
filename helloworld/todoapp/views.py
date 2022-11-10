from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Todo
from .serializer import Todoserializer
from rest_framework.response import Response



class TodoView(ModelViewSet):
    queryset = Todo.objects.all().order_by('-id')
    serializer_class = Todoserializer