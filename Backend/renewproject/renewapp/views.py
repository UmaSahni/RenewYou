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



from .models import Meal
@csrf_exempt
def dashboard(request):
    if request.method == 'GET':
        meals = Meal.objects.all()  # Get all meals from the database
        
        # Get a list of all meal names
        meal_names = [meal.name for meal in meals]
        
        total_protein = 0
        total_carb = 0
        total_fat = 0
        
        # Calculate the sum of protein, carb, and fat values from all meals
        for meal in meals:
            total_protein += meal.protein
            total_carb += meal.carb
            total_fat += meal.fat
        
        response_data = {
            "meal_names": meal_names,
            "total_protein": total_protein,
            "total_carb": total_carb,
            "total_fat": total_fat
        }
        
        return JsonResponse(response_data)

#---- Break-Fast-----#

from .models import Meal
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_breakfast(request):
    if request.method == 'POST':
        meal_type = "breakfast"
        request_data = json.loads(request.body)
        name = request_data.get('name')
        calories_str = request_data.get('calories')
        protein_str = request_data.get('protein')
        carb_str = request_data.get('carb')
        fat_str = request_data.get('fat')
        print(calories_str, "ccccc")
        if None not in (calories_str, protein_str, carb_str, fat_str):
            try:
                calories = float(calories_str)
                protein = float(protein_str)
                carb = float(carb_str)
                fat = float(fat_str)
                
                meal = Meal.objects.create(
                    meal_type=meal_type,
                    name=name,
                    calories=calories,
                    protein=protein,
                    carb=carb,
                    fat=fat
                )
                return JsonResponse({'message': 'Breakfast added successfully'})
                
            except ValueError:
                return JsonResponse({'message': 'Invalid number format for some fields'}, status=400)
        else:
            return JsonResponse({'message': 'Missing required fields'}, status=400)
        
#------ Lunch --------#
@csrf_exempt
def add_lunch(request):
    if request.method == 'POST':
        meal_type = "lunch"
        request_data = json.loads(request.body)
        name = request_data.get('name')
        calories_str = request_data.get('calories')
        protein_str = request_data.get('protein')
        carb_str = request_data.get('carb')
        fat_str = request_data.get('fat')
       
        if None not in (calories_str, protein_str, carb_str, fat_str):
            try:
                calories = float(calories_str)
                protein = float(protein_str)
                carb = float(carb_str)
                fat = float(fat_str)
                
                meal = Meal.objects.create(
                    meal_type=meal_type,
                    name=name,
                    calories=calories,
                    protein=protein,
                    carb=carb,
                    fat=fat
                )
                return JsonResponse({'message': 'Lunch added successfully'})
                
            except ValueError:
                return JsonResponse({'message': 'Invalid number format for some fields'}, status=400)
        else:
            return JsonResponse({'message': 'Missing required fields'}, status=400)



#------ Dinner --------#
@csrf_exempt
def add_dinner(request):
    if request.method == 'POST':
        meal_type = "dinner"
        request_data = json.loads(request.body)
        name = request_data.get('name')
        calories_str = request_data.get('calories')
        protein_str = request_data.get('protein')
        carb_str = request_data.get('carb')
        fat_str = request_data.get('fat')
      
        if None not in (calories_str, protein_str, carb_str, fat_str):
            try:
                calories = float(calories_str)
                protein = float(protein_str)
                carb = float(carb_str)
                fat = float(fat_str)
                
                meal = Meal.objects.create(
                    meal_type=meal_type,
                    name=name,
                    calories=calories,
                    protein=protein,
                    carb=carb,
                    fat=fat
                )
                return JsonResponse({'message': 'Dinner added successfully'})
                
            except ValueError:
                return JsonResponse({'message': 'Invalid number format for some fields'}, status=400)
        else:
            return JsonResponse({'message': 'Missing required fields'}, status=400)


#------------- Fitness Data -------------#
@csrf_exempt
def get_fitness_data(request):
    fitness_data = {
        "weightloss": [
            {"title": "Weight Loss Tip 1", "description": "Eat a balanced diet."},
            {"title": "Weight Loss Tip 2", "description": "Stay hydrated."},
        ],
        "heightgain": [
             {"title": "Height Gain Tip 1", "description": "Practice good posture."},
            {"title": "Height Gain Tip 2", "description": "Get enough sleep."},
        ],
        "weightgain": [
            {"title": "Weight Gain Tip 1", "description": "Consume more calories."},
            {"title": "Weight Gain Tip 2", "description": "Focus on strength training."},
        ],
    }
    return JsonResponse(fitness_data)