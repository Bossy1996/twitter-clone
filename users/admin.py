from users.managers import CustomUserManager
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User
from .serializers import UserCreationSerializer, UserChangeSerializer

class CustomUserAdmin(UserAdmin):

    list_display = ('email', 'is_staff', 'is_active')
    list_filter = ('email', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ['email']
    ordering = ('email')

    class Meta:
        Model = User


admin.site.register(User, CustomUserManager)