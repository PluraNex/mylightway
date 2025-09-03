from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):
    """
    Permissão personalizada que permite apenas ao proprietário editar o objeto.
    """
    
    def has_object_permission(self, request, view, obj):
        # Permissões de leitura para qualquer request
        # Portanto, sempre permitir GET, HEAD ou OPTIONS
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        # Permissões de escrita apenas para o proprietário do objeto
        return obj.user == request.user


class IsParentOrChild(BasePermission):
    """
    Permissão para pais ou responsáveis acessarem dados de suas crianças
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        # Se o usuário é o proprietário do objeto
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        
        # Se o usuário é um responsável da criança
        if request.user.user_type in ['parent', 'admin']:
            from apps.accounts.models import ParentChildRelationship
            
            # Verifica se existe relacionamento
            if hasattr(obj, 'user'):
                return ParentChildRelationship.objects.filter(
                    parent=request.user,
                    child=obj.user
                ).exists()
        
        return False


class IsAdminOrReadOnly(BasePermission):
    """
    Permissão que permite apenas administradores editarem
    """
    
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        return request.user and request.user.is_authenticated and request.user.user_type == 'admin'


class IsChildUser(BasePermission):
    """
    Permissão que verifica se o usuário é uma criança
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.user_type == 'child'


class IsParentUser(BasePermission):
    """
    Permissão que verifica se o usuário é um responsável
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.user_type in ['parent', 'admin']


class CanMonitorProgress(BasePermission):
    """
    Permissão para monitorar progresso de crianças
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        # Se o usuário é o proprietário do progresso
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        
        # Se o usuário é um responsável com permissão de monitoramento
        if request.user.user_type in ['parent', 'admin']:
            from apps.accounts.models import ParentChildRelationship
            
            if hasattr(obj, 'user'):
                return ParentChildRelationship.objects.filter(
                    parent=request.user,
                    child=obj.user,
                    can_monitor_progress=True
                ).exists()
        
        return False