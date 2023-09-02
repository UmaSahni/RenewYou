from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from .models import  FitnessGoal, WorkoutPlan, TrainerProfile
import json
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login
from .models import WaterIntake
from django.db import models 

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


from .models import CustomUser  # Import your CustomUser model

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = CustomUser.objects.get(email=email)  # Assuming email is unique
            if user.check_password(password):
                # Password is correct, log in the user
                # You can add any additional authentication logic here
                return JsonResponse({"message": "User logged in successfully.", "user_id": user.id})
        except CustomUser.DoesNotExist:
            pass
        
        # Authentication failed
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
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def dashboard(request, user_id):
    if request.method == 'GET':
        try:
            # Convert user_id to an integer
            user_id = int(user_id)

            # Get all meals from the database
            all_meals = Meal.objects.all()

            # Filter meals for the specific user
            user_meals = [meal for meal in all_meals if meal.user_id == user_id]

            # Get a list of meal names for the user
            meal_names = [meal.name for meal in user_meals]

            total_protein = sum(meal.protein for meal in user_meals)
            total_carb = sum(meal.carb for meal in user_meals)
            total_fat = sum(meal.fat for meal in user_meals)

            response_data = {
                "meal_names": meal_names,
                "total_protein": total_protein,
                "total_carb": total_carb,
                "total_fat": total_fat
            }

            return JsonResponse(response_data)

        except ValueError:
            return HttpResponseBadRequest("Invalid user ID")

    return HttpResponseBadRequest("Invalid request")

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
        user = request_data.get('user')
        if None not in (calories_str, protein_str, carb_str, fat_str, user):
            try:
                calories = float(calories_str)
                protein = float(protein_str)
                carb = float(carb_str)
                fat = float(fat_str)
                user_id = int(user)
                meal = Meal.objects.create(
                    meal_type=meal_type,
                    name=name,
                    calories=calories,
                    protein=protein,
                    carb=carb,
                    fat=fat,
                    user_id=user_id
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
        user= request_data.get('user')
        if None not in (calories_str, protein_str, carb_str, fat_str, user):
            try:
                calories = float(calories_str)
                protein = float(protein_str)
                carb = float(carb_str)
                fat = float(fat_str)
                user_id = int(user)
                meal = Meal.objects.create(
                    meal_type=meal_type,
                    name=name,
                    calories=calories,
                    protein=protein,
                    carb=carb,
                    fat=fat,
                    user_id = user_id
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
        user = request_data.get('user')
        if None not in (calories_str, protein_str, carb_str, fat_str, user):
            try:
                calories = float(calories_str)
                protein = float(protein_str)
                carb = float(carb_str)
                fat = float(fat_str)
                user_id = int(user)
                meal = Meal.objects.create(
                    meal_type=meal_type,
                    name=name,
                    calories=calories,
                    protein=protein,
                    carb=carb,
                    fat=fat,
                    user_id = user_id
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

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import WaterIntake
from django.db.models import Sum

from django.http import JsonResponse
from .models import CustomUser, WaterIntake

from django.http import JsonResponse
from .models import CustomUser, WaterIntake
import json

@csrf_exempt
def update_water_intake(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user', None)
            amount_ml = data.get('amount_ml', 0)
            
            if user_id is not None:
                # Create a new water intake record for the user
                water_intake = WaterIntake.objects.create(user_id=user_id, amount_ml=amount_ml)
                
                # Check if the user has earned any of the three badges
                user = CustomUser.objects.get(id=user_id)
                earned_badge_names = check_badges(user, amount_ml)
                
                # Get the user's existing badge names as a list
                existing_badge_names = user.badge_names.split(',') if user.badge_names else []
                
                # Combine the existing and earned badge names and remove duplicates
                all_badge_names = list(set(existing_badge_names + earned_badge_names))
                
                # Update the user's badge_names field with the combined badge names as a comma-separated string
                user.badge_names = ','.join(all_badge_names)
                user.save()
                
                return JsonResponse({
                    "message": f"Water intake updated successfully. You drank {amount_ml} ml of water.",
                    "water_intake_id": water_intake.id,
                    "earned_badge_names": earned_badge_names,
                    "all_badge_names": all_badge_names
                }, status=201)
            else:
                return JsonResponse({"message": "Invalid user ID."}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON data."}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method."}, status=405)

# Define a function to check if the user has earned any of the three badges
def check_badges(user, amount_ml):
    earned_badge_names = []
    
    # Check if the user has completed the "Water Drink" badge (e.g., 2 liters of water)
    if amount_ml >= 2000 and "Water Drink" not in user.badge_names.split(','):
        earned_badge_names.append("Water Drink")
    
    # You can add more badge checks here based on your criteria
    # For example, check if the user has completed the "Nutrition Complete" or "Goal Achieve" badges.
    
    return earned_badge_names


from math import floor
@csrf_exempt
def getwater(request):
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user', None)  # Get the user_id from the query parameter

            if user_id is not None:
                # Calculate the total water intake for the user (assuming user_id is valid)
                total_water = WaterIntake.objects.filter(user_id=user_id).aggregate(total=models.Sum('amount_ml'))['total'] or 0
                glasses = floor(total_water / 100)  # Assuming 1 glass = 100 ml

                response_data = {
                    "total_water_ml": total_water,
                    "glasses": glasses
                }

                return JsonResponse(response_data)
            else:
                return JsonResponse({"total_water_ml": 0, "glasses": 0, "message": "Invalid user ID."}, status=400)

        except WaterIntake.DoesNotExist:
            return JsonResponse({"total_water_ml": 0, "glasses": 0})

    return JsonResponse({"message": "Invalid request method."}, status=405)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser

@csrf_exempt
def get_user_data(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        # Serialize user data to JSON format
        user_data = {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "weight": user.weight,
            "height": user.height,
            "age": user.age,
            "sex": user.sex,
            "is_active": user.is_active,
            "is_staff": user.is_staff,
        }
        return JsonResponse(user_data)
    except CustomUser.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=404)
