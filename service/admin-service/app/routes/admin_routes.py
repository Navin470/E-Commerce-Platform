from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.admin_service import create_admin, get_all_admins, get_admin_by_user_id, is_user_admin

admin_bp = Blueprint("admin", __name__)

# Health check
@admin_bp.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}, 200


# -----------------------------
# Admin-only protected routes
# -----------------------------

# Check if current user is admin
@admin_bp.route("/check", methods=["GET"])
@jwt_required()
def check_admin():
    user_id = int(get_jwt_identity())
    if not is_user_admin(user_id):
        return jsonify({"error": "Admin access required"}), 403
    return jsonify({"is_admin": True, "user_id": user_id}), 200


# Get all admins (Super Admin only)
@admin_bp.route("/admins", methods=["GET"])
@jwt_required()
def list_admins():
    user_id = int(get_jwt_identity())
    if not is_user_admin(user_id):
        return jsonify({"error": "Admin access required"}), 403

    admins = get_all_admins()
    return jsonify([a.to_dict() for a in admins])


# Create new admin (Super Admin only - for now simple version)
@admin_bp.route("/admins", methods=["POST"])
@jwt_required()
def add_admin():
    user_id = int(get_jwt_identity())
    if not is_user_admin(user_id):
        return jsonify({"error": "Admin access required"}), 403

    data = request.get_json() or {}
    target_user_id = data.get("user_id")
    is_super = data.get("is_super_admin", False)

    if not target_user_id:
        return jsonify({"error": "user_id is required"}), 400

    admin, error = create_admin(target_user_id, is_super)
    if error:
        return jsonify({"error": error}), 400

    return jsonify({"message": "Admin created", "admin": admin.to_dict()}), 201


# Get all products (from product-service) - Admin view
@admin_bp.route("/products", methods=["GET"])
@jwt_required()
def get_all_products_admin():
    user_id = int(get_jwt_identity())
    if not is_user_admin(user_id):
        return jsonify({"error": "Admin access required"}), 403

    # TODO: Later call product-service via HTTP
    return jsonify({"message": "This will call product-service in future"}), 200


# Get all orders (from order-service) - Admin view
@admin_bp.route("/orders", methods=["GET"])
@jwt_required()
def get_all_orders_admin():
    import urllib.request
    import json
    user_id = int(get_jwt_identity())
    if not is_user_admin(user_id):
        return jsonify({"error": "Admin access required"}), 403

    try:
        # Fetch all orders from order-service internally
        try:
            req1 = urllib.request.urlopen("http://order-service:5003/order/internal/orders/all")
            orders = json.loads(req1.read())
        except Exception:
            orders = []

        # Fetch all user profiles from user-service internally
        try:
            req2 = urllib.request.urlopen("http://user-service:5005/user/internal/profiles/all")
            profiles = json.loads(req2.read())
        except Exception:
            profiles = []

        # Create a dictionary of profile for quick lookup
        profile_map = {p.get("user_id"): p for p in profiles}

        # Merge them
        for order in orders:
            order["user_profile"] = profile_map.get(order.get("user_id"), None)

        return jsonify(orders), 200

    except Exception as e:
        return jsonify({"error": f"Failed to fetch admin orders: {str(e)}"}), 500