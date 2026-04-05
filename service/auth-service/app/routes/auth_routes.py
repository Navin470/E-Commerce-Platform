# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from app.services.auth_service import register_user, login_user

auth_bp = Blueprint("auth", __name__)

# -----------------------------
# Health check endpoint
# -----------------------------
@auth_bp.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}, 200

# -----------------------------
# User registration
# -----------------------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Email and password required"}), 400

    user, error = register_user(data["email"], data["password"])

    if error:
        return jsonify({"error": error}), 400

    return jsonify({"message": "User registered successfully"}), 201

# -----------------------------
# User login
# -----------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Email and password required"}), 400

    user, error = login_user(data["email"], data["password"])

    if error:
        return jsonify({"error": error}), 401

    # Create JWT token with string identity
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

# -----------------------------
# Token validation
# -----------------------------
@auth_bp.route("/validate", methods=["GET"])
@jwt_required()
def validate():
    user_id = get_jwt_identity()
    return jsonify({"user_id": user_id, "valid": True}), 200