from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from pydantic import BaseModel
from datetime import datetime

from .auth import get_current_active_user, User

router = APIRouter()

# Models
class UserProfile(BaseModel):
    username: str
    full_name: str
    email: str
    phone: str
    vehicle_info: dict
    preferences: dict

class UserSettings(BaseModel):
    notifications_enabled: bool
    dark_mode: bool
    language: str
    units: str

# Mock database - replace with real database in production
fake_profiles_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "john@example.com",
        "phone": "+91 9876543210",
        "vehicle_info": {
            "make": "Toyota",
            "model": "Camry",
            "year": 2022,
            "license_plate": "KA01AB1234"
        },
        "preferences": {
            "notification_frequency": "daily",
            "report_format": "detailed"
        }
    }
}

fake_settings_db = {
    "johndoe": {
        "notifications_enabled": True,
        "dark_mode": True,
        "language": "en",
        "units": "metric"
    }
}

@router.get("/profile", response_model=UserProfile)
async def get_user_profile(current_user: User = Depends(get_current_active_user)):
    if current_user.username not in fake_profiles_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    return fake_profiles_db[current_user.username]

@router.put("/profile", response_model=UserProfile)
async def update_user_profile(
    profile: UserProfile,
    current_user: User = Depends(get_current_active_user)
):
    if current_user.username != profile.username:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this profile"
        )
    fake_profiles_db[current_user.username] = profile.dict()
    return profile

@router.get("/settings", response_model=UserSettings)
async def get_user_settings(current_user: User = Depends(get_current_active_user)):
    if current_user.username not in fake_settings_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User settings not found"
        )
    return fake_settings_db[current_user.username]

@router.put("/settings", response_model=UserSettings)
async def update_user_settings(
    settings: UserSettings,
    current_user: User = Depends(get_current_active_user)
):
    fake_settings_db[current_user.username] = settings.dict()
    return settings

@router.delete("/account")
async def delete_account(current_user: User = Depends(get_current_active_user)):
    if current_user.username in fake_profiles_db:
        del fake_profiles_db[current_user.username]
    if current_user.username in fake_settings_db:
        del fake_settings_db[current_user.username]
    return {"message": "Account deleted successfully"} 