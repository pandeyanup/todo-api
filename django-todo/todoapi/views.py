from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TodoItem
from .serializers import TodoItemSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/todos/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of todo items.'
        },
        {
            'Endpoint': '/todos/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates a new todo item with data sent in post request.'
        },
        {
            'Endpoint': '/todos/update/<str:pk>/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Updates todo item with matching id.'
        },
        {
            'Endpoint': '/todos/delete/<str:pk>/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes todo item with matching id.'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getTodos(request):
    todo = TodoItem.objects.all()
    serializer = TodoItemSerializer(todo, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTodo(request, pk):
    todo = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(todo, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createTodos(request):
    data = request.data
    todo = TodoItem.objects.create(
        title=data['title'],
        completed=data['completed']
    )
    serializer = TodoItemSerializer(todo, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateTodos(request, pk):
    data = request.data
    todo = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(instance=todo, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# @api_view(['DELETE'])
# def deleteTodos(request, pk):
#     todo = TodoItem.objects.get(id=pk)
#     todo.delete()
#     return Response("Item successfully deleted!")

@api_view(['DELETE'])
def deleteTodos(request, pk):
    try:
        todo = TodoItem.objects.get(id=pk)
        todo.delete()
        return Response("Item successfully deleted!")
    except TodoItem.DoesNotExist:
        return Response("Item not found.", status=404)