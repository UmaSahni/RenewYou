from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from .models import  FitnessGoal, WorkoutPlan, TrainerProfile
import json
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
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
        


        # renewapp/views.py

@csrf_exempt
@login_required
def create_goal(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = request.user
        goal_name = data.get('goal_name')
        goal_value = data.get('goal_value')

        fitness_goal = FitnessGoal(user=user, goal_name=goal_name, goal_value=goal_value)
        fitness_goal.save()

        return JsonResponse({"message": "Goal created successfully.", "goal_id": str(fitness_goal.id)}, status=201)
    else:
        return JsonResponse({"message": "Invalid request method."})



@login_required
@csrf_exempt
def create_trainer_profile(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = request.user

        try:
            trainer_profile = TrainerProfile.objects.create(
                user=user,
                name=data['name'],
                specialization=data['specialization'],
                experience=data['experience'],
                gender=data['gender'],
                contact_number=data['contact_number'],
                email=data['email'],
                availability=data['availability'],
                languages_spoken=data['languages_spoken'],
                location=data['location'],
                photo=data['photo'] if 'photo' in data else None
            )
            return JsonResponse({"message": "Trainer profile created successfully.", "profile_id": trainer_profile.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method."})

    


@login_required
@csrf_exempt
def create_workout_plan(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = request.user

        try:
            # Retrieve the TrainerProfile associated with the user
            trainer_profile = get_object_or_404(TrainerProfile, user=user)

            plan_name = data.get('plan_name')
            goal = data.get('goal')
            duration = data.get('duration')
            description = data.get('description')

            # Create the WorkoutPlan associated with the TrainerProfile
            workout_plan = WorkoutPlan.objects.create(
                trainer=trainer_profile,
                plan_name=plan_name,
                goal=goal,
                duration=duration,
                description=description
            )

            return JsonResponse({"message": "Workout plan created successfully.", "plan_id": workout_plan.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method."})
    



#------ Dashboard ------#


from .models import Breakfast, Lunch, Dinner

def dashboard(request):
    # Calculate and sum the protein, carb, and fat values from all meals
    total_protein = 0
    total_carb = 0
    total_fat = 0
    
    # Sum up values from Breakfast
    breakfasts = Breakfast.objects.all()
    for breakfast in breakfasts:
        total_protein += breakfast.protein
        total_carb += breakfast.carb
        total_fat += breakfast.fat
    
    # Sum up values from Lunch
    lunches = Lunch.objects.all()
    for lunch in lunches:
        total_protein += lunch.protein
        total_carb += lunch.carb
        total_fat += lunch.fat
    
    # Sum up values from Dinner
    dinners = Dinner.objects.all()
    for dinner in dinners:
        total_protein += dinner.protein
        total_carb += dinner.carb
        total_fat += dinner.fat
    
    data = {
        'total_protein': total_protein,
        'total_carb': total_carb,
        'total_fat': total_fat,
    }
    
    return JsonResponse(data)
