from app.models.product_model import Product
from app.extensions import db

def create_product(data):
    product = Product(
        name=data["name"],
        description=data.get("description"),
        price=data["price"],
        image_url=data.get("image_url")
    )
    db.session.add(product)
    db.session.commit()
    return product

def get_all_products():
    return Product.query.all()

def get_product(product_id):
    return Product.query.get(product_id)

def update_product(product, data):
    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.image_url = data.get("image_url", product.image_url)

    db.session.commit()
    return product

def filter_products(search=None, min_price=None, max_price=None):
    query = Product.query
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if min_price:
        query = query.filter(Product.price >= float(min_price))
    if max_price:
        query = query.filter(Product.price <= float(max_price))
    return query.all()

def delete_product(product):
    db.session.delete(product)
    db.session.commit()