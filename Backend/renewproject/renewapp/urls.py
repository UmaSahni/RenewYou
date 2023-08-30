from django.urls import path
from .views import user_registration,user_login, create_goal, create_trainer_profile, create_workout_plan, dashboard, add_breakfast

urlpatterns = [
    path('register/', user_registration, name='user_registration'),
    path('login/', user_login, name='user_login'),
    path('create-goal/', create_goal, name='create-goal'),
    path('create-trainer-profile/', create_trainer_profile, name='create-trainer-profile'),
    path('create-workout-plan/', create_workout_plan, name='create-workout-plan'),
    path('dashboard/', dashboard, name='dashboard'),
    path('add-breakfast/',add_breakfast , name='add-breakfast'),
    # Other URL patterns can be added here
]
