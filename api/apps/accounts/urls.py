from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

app_name = 'accounts'

urlpatterns = [
    # Autenticação
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Perfil do usuário
    path('me/', views.user_me, name='user_me'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('settings/', views.UserSettingsView.as_view(), name='user_settings'),
    path('update/', views.UserUpdateView.as_view(), name='user_update'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    path('dashboard/', views.user_dashboard_stats, name='dashboard_stats'),
    
    # Relacionamentos familiares
    path('relationships/', views.ParentChildRelationshipListCreateView.as_view(), name='relationships_list'),
    path('relationships/<int:pk>/', views.ParentChildRelationshipDetailView.as_view(), name='relationships_detail'),
    path('children/', views.ChildrenListView.as_view(), name='children_list'),
    path('children/<uuid:child_id>/', views.ChildDetailView.as_view(), name='child_detail'),
]