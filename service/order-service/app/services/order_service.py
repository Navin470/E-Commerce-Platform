from app.models.order_model import Order, OrderItem
from app.extensions import db
from datetime import datetime

def create_order(user_id, items):
    """
    items = [{"product_id": 1, "quantity": 2, "price": 99.99}, ...]
    """
    if not items:
        raise ValueError("Order must contain at least one item")

    order = Order(
        user_id=user_id,
        status="pending",
        total_amount=0.0
    )

    total = 0.0
    for item in items:
        order_item = OrderItem(
            product_id=item["product_id"],
            quantity=item["quantity"],
            price_at_purchase=item["price"]
        )
        order.items.append(order_item)
        total += item["price"] * item["quantity"]

    order.total_amount = total
    db.session.add(order)
    db.session.commit()
    return order


def get_orders_by_user(user_id):
    return Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()


def get_order(order_id):
    return Order.query.get(order_id)


def update_order_status(order_id, status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.status = status
    db.session.commit()
    return order