from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler
from django.core.exceptions import ValidationError as DjangoValidationError
from django.http import Http404
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler for DRF
    """
    response = exception_handler(exc, context)
    
    # Log the exception
    if response is not None:
        logger.error(f"API Exception: {exc}", exc_info=True)
    
    custom_response_data = {}
    
    if response is not None:
        if isinstance(response.data, dict):
            custom_response_data['error'] = True
            custom_response_data['message'] = _get_error_message(response.data)
            custom_response_data['details'] = response.data
        else:
            custom_response_data['error'] = True
            custom_response_data['message'] = str(response.data)
            custom_response_data['details'] = response.data
        
        custom_response_data['status_code'] = response.status_code
        response.data = custom_response_data
    
    # Handle Django's ValidationError
    elif isinstance(exc, DjangoValidationError):
        custom_response_data['error'] = True
        custom_response_data['message'] = 'Erro de validação'
        custom_response_data['details'] = exc.message_dict if hasattr(exc, 'message_dict') else [str(exc)]
        custom_response_data['status_code'] = status.HTTP_400_BAD_REQUEST
        
        response = Response(
            custom_response_data,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Handle Http404
    elif isinstance(exc, Http404):
        custom_response_data['error'] = True
        custom_response_data['message'] = 'Recurso não encontrado'
        custom_response_data['details'] = str(exc)
        custom_response_data['status_code'] = status.HTTP_404_NOT_FOUND
        
        response = Response(
            custom_response_data,
            status=status.HTTP_404_NOT_FOUND
        )
    
    return response


def _get_error_message(error_data):
    """
    Extract a user-friendly error message from error data
    """
    if isinstance(error_data, dict):
        # Handle validation errors
        if 'non_field_errors' in error_data:
            return error_data['non_field_errors'][0] if error_data['non_field_errors'] else 'Erro de validação'
        
        # Handle field-specific errors
        for field, messages in error_data.items():
            if isinstance(messages, list) and messages:
                return f"{field}: {messages[0]}"
            elif isinstance(messages, str):
                return f"{field}: {messages}"
        
        # Handle detail messages
        if 'detail' in error_data:
            return error_data['detail']
    
    elif isinstance(error_data, list) and error_data:
        return error_data[0]
    
    return str(error_data)