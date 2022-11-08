from django.contrib import admin
from django.urls import path, include
from todoapp.views import TodoView
from rest_framework import routers

route = routers.DefaultRouter()
route.register("", TodoView, basename = "todo")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(route.urls)),
]