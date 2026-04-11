from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.user_service import create_or_update_profile, get_profile_by_user_id

user_bp = Blueprint("users", __name__)

# Health check
@user_bp.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}, 200


# Get current user's profile (Protected)
@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    profile = get_profile_by_user_id(user_id)

    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    return jsonify(profile.to_dict())


# Create or Update profile (Protected)
@user_bp.route("/profile", methods=["POST", "PUT"])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}

    try:
        profile = create_or_update_profile(user_id, data)
        return jsonify({
            "message": "Profile updated successfully",
            "profile": profile.to_dict()
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to update profile"}), 500


# Admin endpoint - Get any user profile (optional, protected)
@user_bp.route("/profile/<int:profile_id>", methods=["GET"])
@jwt_required()
def get_profile_by_id(profile_id):
    profile = get_profile(profile_id)
    if not profile:
        return jsonify({"error": "Profile not found"}), 404
    return jsonify(profile.to_dict())