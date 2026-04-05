from flask import Flask
from .config import Config
from .extensions import db
from .routes.product_routes import product_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(product_bp, url_prefix="/products")

    return app