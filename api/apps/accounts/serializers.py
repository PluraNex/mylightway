from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User, Profile, ParentChildRelationship, UserSettings
from drf_spectacular.utils import extend_schema_field, OpenApiExample
from drf_spectacular.openapi import OpenApiTypes


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'username', 'password', 'password_confirm',
            'first_name', 'last_name', 'user_type', 'birth_date'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("As senhas não coincidem")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        user = User.objects.create_user(**validated_data)
        
        # Criar perfil e configurações automaticamente
        Profile.objects.create(user=user)
        UserSettings.objects.create(user=user)
        
        return user


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'full_name', 'user_type', 'birth_date', 'avatar',
            'is_active', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'user', 'phone', 'bio', 'favorite_verse', 'denomination',
            'church_name', 'preferred_language', 'timezone',
            'notifications_enabled', 'email_notifications'
        ]


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = [
            'preferred_difficulty', 'daily_goal_minutes', 'reminder_time',
            'weekend_reminders', 'sound_effects', 'animations',
            'dark_mode', 'font_size', 'auto_play_videos', 'show_hints'
        ]


class ParentChildRelationshipSerializer(serializers.ModelSerializer):
    parent = UserSerializer(read_only=True)
    child = UserSerializer(read_only=True)
    parent_id = serializers.UUIDField(write_only=True)
    child_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = ParentChildRelationship
        fields = [
            'id', 'parent', 'child', 'parent_id', 'child_id',
            'relationship_type', 'can_monitor_progress',
            'can_assign_activities', 'can_modify_settings',
            'is_primary', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, attrs):
        parent_id = attrs.get('parent_id')
        child_id = attrs.get('child_id')
        
        # Verificar se os usuários existem
        try:
            parent = User.objects.get(id=parent_id)
            child = User.objects.get(id=child_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("Usuário não encontrado")
        
        # Verificar tipos de usuário
        if parent.user_type not in ['parent', 'admin']:
            raise serializers.ValidationError("O responsável deve ser do tipo 'parent' ou 'admin'")
        
        if child.user_type != 'child':
            raise serializers.ValidationError("A criança deve ser do tipo 'child'")
        
        # Verificar se já existe relacionamento
        if ParentChildRelationship.objects.filter(parent=parent, child=child).exists():
            raise serializers.ValidationError("Relacionamento já existe")
        
        attrs['parent'] = parent
        attrs['child'] = child
        
        return attrs
    
    def create(self, validated_data):
        parent = validated_data.pop('parent')
        child = validated_data.pop('child')
        validated_data.pop('parent_id', None)
        validated_data.pop('child_id', None)
        
        return ParentChildRelationship.objects.create(
            parent=parent,
            child=child,
            **validated_data
        )


class ChildrenListSerializer(serializers.ModelSerializer):
    """Serializer para listar crianças de um responsável"""
    relationship_info = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'birth_date', 'avatar', 'relationship_info'
        ]
    
    def get_relationship_info(self, obj):
        request = self.context.get('request')
        if request and request.user:
            try:
                relationship = ParentChildRelationship.objects.get(
                    parent=request.user,
                    child=obj
                )
                return {
                    'relationship_type': relationship.relationship_type,
                    'can_monitor_progress': relationship.can_monitor_progress,
                    'can_assign_activities': relationship.can_assign_activities,
                    'can_modify_settings': relationship.can_modify_settings,
                    'is_primary': relationship.is_primary
                }
            except ParentChildRelationship.DoesNotExist:
                return None
        return None


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer para atualização de dados do usuário"""
    
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'birth_date', 'avatar'
        ]
    
    def validate_avatar(self, value):
        if value and value.size > 5 * 1024 * 1024:  # 5MB
            raise serializers.ValidationError("O arquivo não pode ser maior que 5MB")
        return value


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("As senhas não coincidem")
        return attrs
    
    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Senha atual incorreta")
        return value