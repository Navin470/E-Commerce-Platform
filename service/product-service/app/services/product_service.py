from app.models import Product
from app.extensions import db

def create_product(data):
    product = Product(
        name=data.get("name"),
        description=data.get("description"),
        price=data.get("price"),
        stock=data.get("stock", 0),
        category=data.get("category")
    )
    db.session.add(product)
    db.session.commit()
    return product


def get_all_products():
    return Product.query.all()


def get_product(product_id):
    return Product.query.get(product_id)


def update_product(product_id, data):
    product = Product.query.get(product_id)
    if not product:
        return None

    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.stock = data.get("stock", product.stock)
    product.category = data.get("category", product.category)

    db.session.commit()
    return product


def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return False

    db.session.delete(product)
    db.session.commit()
    return True


def search_products(query):
    return Product.query.filter(Product.name.ilike(f"%{query}%")).all()