from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import json

from django.contrib.auth import authenticate, login


User = get_user_model()

@csrf_exempt
def user_registration(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            user = User.objects.create_user(
                email=data['email'],
                password=data['password'],
                name=data['name'],
                weight=data['weight'],
                height=data['height'],
                age=data['age'],
                sex=data['sex'],
            )
            return JsonResponse({"message": "User registered successfully."}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "User logged in successfully."})
        else:
            return JsonResponse({"message": "Invalid credentials."}, status=401)