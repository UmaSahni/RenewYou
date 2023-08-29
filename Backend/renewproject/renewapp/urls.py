from django.urls import path
from .views import user_registration

urlpatterns = [
    path('register/', user_registration, name='user_registration'),
    # Other URL patterns can be added here
]
