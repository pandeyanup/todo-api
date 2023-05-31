from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('todos/', views.getTodos, name="todos"),
    path('todos/add/', views.createTodos, name="create-todo"),
    path('todos/<str:pk>/update/', views.updateTodos, name="update-todo"),
    path('todos/<str:pk>/delete/', views.deleteTodos, name="delete-todo"),
    path('todos/<str:pk>/', views.getTodo, name="todo"),
]