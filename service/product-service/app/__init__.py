from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    from .routes.product_routes import product_bp
    app.register_blueprint(product_bp, url_prefix="/product")
    with app.app_context():
        db.create_all()

    return app