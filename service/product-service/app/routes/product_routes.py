from flask import Blueprint, request, jsonify
from app.services.product_service import (
    create_product,
    get_all_products,
    get_product,
    update_product,
    delete_product,
    search_products
)

product_bp = Blueprint("product", __name__)


@product_bp.route("/", methods=["POST"])
def create():
    data = request.json
    product = create_product(data)
    return jsonify(product.to_dict()), 201


@product_bp.route("/", methods=["GET"])
def get_all():
    products = get_all_products()
    return jsonify([p.to_dict() for p in products])


@product_bp.route("/<int:product_id>", methods=["GET"])
def get_one(product_id):
    product = get_product(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict())


@product_bp.route("/<int:product_id>", methods=["PUT"])
def update(product_id):
    data = request.json
    product = update_product(product_id, data)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict())


@product_bp.route("/<int:product_id>", methods=["DELETE"])
def delete(product_id):
    success = delete_product(product_id)
    if not success:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Deleted successfully"})


@product_bp.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    products = search_products(query)
    return jsonify([p.to_dict() for p in products])


@product_bp.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "product-service running"})