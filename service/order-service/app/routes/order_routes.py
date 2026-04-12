from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.order_service import create_order, get_orders_by_user, get_order, update_order_status

order_bp = Blueprint("orders", __name__)

# Health check
@order_bp.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}, 200


# Create new order (Protected)
@order_bp.route("/orders", methods=["POST"])
@jwt_required()
def create():
    user_id = int(get_jwt_identity())          # Comes from auth-service as string
    data = request.get_json()

    if not data or "items" not in data:
        return jsonify({"error": "items list is required"}), 400

    try:
        order = create_order(user_id, data["items"])
        return jsonify(order.to_dict()), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


# Get all orders of current user
@order_bp.route("/orders", methods=["GET"])
@jwt_required()
def get_my_orders():
    user_id = int(get_jwt_identity())
    orders = get_orders_by_user(user_id)
    return jsonify([o.to_dict() for o in orders])


# Get single order (only if it belongs to the user)
@order_bp.route("/orders/<int:order_id>", methods=["GET"])
@jwt_required()
def get_one_order(order_id):
    user_id = int(get_jwt_identity())
    order = get_order(order_id)

    if not order:
        return jsonify({"error": "Order not found"}), 404

    if order.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    return jsonify(order.to_dict())


# Update status (for admin or future order-service internal use)
@order_bp.route("/orders/<int:order_id>/status", methods=["PUT"])
@jwt_required()
def update_status(order_id):
    data = request.get_json()
    if not data or "status" not in data:
        return jsonify({"error": "status is required"}), 400

    order = update_order_status(order_id, data["status"])
    if not order:
        return jsonify({"error": "Order not found"}), 404

    return jsonify(order.to_dict())


# Internal Endpoint -> Get ALL orders for admin service
@order_bp.route("/internal/orders/all", methods=["GET"])
def get_all_orders_internal():
    from app.models.order_model import Order
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([o.to_dict() for o in orders])