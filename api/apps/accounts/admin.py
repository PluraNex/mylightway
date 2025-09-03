from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User, Profile, ParentChildRelationship, UserSettings


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Administração customizada para o modelo User
    """
    list_display = [
        'email', 'username', 'first_name', 'last_name', 
        'user_type', 'is_active', 'date_joined'
    ]
    list_filter = ['user_type', 'is_active', 'date_joined']
    search_fields = ['email', 'username', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Informações Adicionais', {
            'fields': ('user_type', 'birth_date', 'avatar')
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Informações Adicionais', {
            'fields': ('user_type', 'birth_date')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('profile')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """
    Administração para perfis de usuário
    """
    list_display = [
        'user', 'phone', 'denomination', 'church_name',
        'notifications_enabled', 'created_at'
    ]
    list_filter = [
        'denomination', 'notifications_enabled', 
        'email_notifications', 'created_at'
    ]
    search_fields = [
        'user__email', 'user__first_name', 'user__last_name',
        'phone', 'denomination', 'church_name'
    ]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ParentChildRelationship)
class ParentChildRelationshipAdmin(admin.ModelAdmin):
    """
    Administração para relacionamentos familiares
    """
    list_display = [
        'parent', 'child', 'relationship_type', 
        'is_primary', 'can_monitor_progress', 'created_at'
    ]
    list_filter = [
        'relationship_type', 'is_primary', 
        'can_monitor_progress', 'can_assign_activities'
    ]
    search_fields = [
        'parent__email', 'parent__first_name', 'parent__last_name',
        'child__email', 'child__first_name', 'child__last_name'
    ]
    readonly_fields = ['created_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('parent', 'child')


@admin.register(UserSettings)
class UserSettingsAdmin(admin.ModelAdmin):
    """
    Administração para configurações de usuário
    """
    list_display = [
        'user', 'preferred_difficulty', 'daily_goal_minutes',
        'dark_mode', 'sound_effects', 'updated_at'
    ]
    list_filter = [
        'preferred_difficulty', 'dark_mode', 'sound_effects',
        'animations', 'auto_play_videos'
    ]
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at']