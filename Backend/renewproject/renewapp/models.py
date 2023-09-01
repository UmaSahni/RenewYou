from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    height = models.FloatField()
    age = models.PositiveIntegerField()
    sex = models.CharField(max_length=1, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'weight', 'height', 'age', 'sex']

    def __str__(self):
        return self.email

    # Add related_name arguments to prevent clashes
    groups = None
    user_permissions = None



class FitnessGoal(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    goal_name = models.CharField(max_length=100)
    goal_value = models.PositiveIntegerField()

#  we'll use a one-to-many relationship where a single trainer can have multiple customers.

class TrainerProfile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='trainer_profile')
    name = models.CharField(max_length=100, default='New Trainer')
    specialization = models.CharField(max_length=100)
    experience = models.PositiveIntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField()
    availability = models.CharField(max_length=100, default='Weekdays')  # Example: Weekdays, Weekends
    languages_spoken = models.CharField(max_length=100, default="English")
    location = models.CharField(max_length=200, default="Mumbai")
    photo = models.ImageField(upload_to='trainer_photos/', null=True, blank=True)


    def __str__(self):
        return self.name + "'s Trainer Profile"


class WorkoutPlan(models.Model):
    GOAL_CHOICES = (
        ('Weight Loss', 'Weight Loss'),
        ('Muscle Gain', 'Muscle Gain'),
        ('Cardio Fitness', 'Cardio Fitness'),
        # Add more goal choices as needed
    )

    trainer = models.ForeignKey(TrainerProfile, on_delete=models.CASCADE)
    plan_name = models.CharField(max_length=100)
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES)
    duration = models.PositiveIntegerField()  # Number of weeks
    description = models.TextField()

    def __str__(self):
        return self.plan_name
    

class Meal(models.Model):
    MEAL_TYPES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    meal_type = models.CharField(max_length=20,default='breakfast', choices=MEAL_TYPES)
    name = models.CharField(max_length=100, default="unknown food")
    calories = models.FloatField()
    protein = models.FloatField()
    carb = models.FloatField()
    fat = models.FloatField()
    fitness_goal = models.ForeignKey(FitnessGoal, on_delete=models.CASCADE,default=1)
    # Add a foreign key to FitnessGoal to associate meals with fitness goals

from django.utils import timezone
class WaterIntake(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    intake_date = models.DateField(default=timezone.now)
    amount_ml = models.PositiveIntegerField(default=0)