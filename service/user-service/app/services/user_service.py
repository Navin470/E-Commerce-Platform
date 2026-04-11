from app.models.user_model import UserProfile
from app.extensions import db

def create_or_update_profile(user_id, data):
    profile = UserProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        profile = UserProfile(user_id=user_id)

    profile.first_name = data.get("first_name")
    profile.last_name = data.get("last_name")
    profile.phone = data.get("phone")
    profile.address = data.get("address")
    profile.city = data.get("city")
    profile.country = data.get("country")

    db.session.add(profile)
    db.session.commit()
    return profile


def get_profile_by_user_id(user_id):
    return UserProfile.query.filter_by(user_id=user_id).first()


def get_profile(profile_id):
    return UserProfile.query.get(profile_id)