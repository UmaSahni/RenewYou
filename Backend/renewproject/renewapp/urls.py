from django.urls import path
from .views import user_registration,user_login, create_goal, create_trainer_profile, create_workout_plan, dashboard, add_breakfast,add_lunch, add_dinner, get_fitness_data

urlpatterns = [
    path('register/', user_registration, name='user_registration'),
    path('login/', user_login, name='user_login'),
    path('create-goal/', create_goal, name='create-goal'),
    path('create-trainer-profile/', create_trainer_profile, name='create-trainer-profile'),
    path('create-workout-plan/', create_workout_plan, name='create-workout-plan'),
    path('dashboard/', dashboard, name='dashboard'),
    path('breakfast/',add_breakfast , name='breakfast'),
    path('lunch/',add_lunch , name='lunch'),
    path('dinner/',add_dinner , name='dinner'),
    path('fitness-data/',get_fitness_data , name='fitness-data'),
    # Other URL patterns can be added here
]
