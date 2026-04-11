from flask import Flask
from flask_cors import CORS
import os

from .extensions import db, jwt

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "super-secret-key")

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    from .routes.order_routes import order_bp
    app.register_blueprint(order_bp, url_prefix="/order")   # Clean prefix

    return app