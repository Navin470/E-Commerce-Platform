import os
from flask import Flask
from flask_cors import CORS
from .extensions import db, bcrypt, jwt

def create_app():
    app = Flask(__name__)

    # ✅ Load config from env (not from Config class anymore)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "super-secret-key")

    print("DB URL:", app.config["SQLALCHEMY_DATABASE_URI"])  # DEBUG

    CORS(app)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from .routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app