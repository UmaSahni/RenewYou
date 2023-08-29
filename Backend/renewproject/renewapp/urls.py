from django.urls import path
from .views import user_registration,user_login,get_csrf_token

urlpatterns = [
    path('register/', user_registration, name='user_registration'),
    path('login/', user_login, name='user_login'),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),
    # Other URL patterns can be added here
]
