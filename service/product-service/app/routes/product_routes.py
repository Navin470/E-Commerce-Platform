from flask import Blueprint, request, jsonify
from app.services.product_service import *

product_bp = Blueprint("products", __name__)

# -----------------------------
# Health check
# -----------------------------
@product_bp.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}, 200


# -----------------------------
# Get all products
# -----------------------------
@product_bp.route("/products", methods=["GET"])
def get_products():
    search = request.args.get("search")
    min_price = request.args.get("min_price")
    max_price = request.args.get("max_price")

    products = filter_products(search, min_price, max_price)

    return jsonify([p.to_dict() for p in products])


# -----------------------------
# Get single product
# -----------------------------
@product_bp.route("/products/<int:id>", methods=["GET"])
def get_product_by_id(id):
    product = get_product(id)
    if not product:
        return {"error": "Product not found"}, 404
    return product.to_dict()


# -----------------------------
# Create product
# -----------------------------
@product_bp.route("/products", methods=["POST"])
def create():
    data = request.get_json()

    if not data or "name" not in data or "price" not in data:
        return {"error": "Name and price required"}, 400

    product = create_product(data)
    return product.to_dict(), 201


# -----------------------------
# Update product
# -----------------------------
@product_bp.route("/products/<int:id>", methods=["PUT"])
def update(id):
    product = get_product(id)
    if not product:
        return {"error": "Product not found"}, 404

    data = request.get_json()
    product = update_product(product, data)
    return product.to_dict()


# -----------------------------
# Delete product
# -----------------------------
@product_bp.route("/products/<int:id>", methods=["DELETE"])
def delete(id):
    product = get_product(id)
    if not product:
        return {"error": "Product not found"}, 404

    delete_product(product)
    return {"message": "Deleted"}