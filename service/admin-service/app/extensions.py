from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS   # We import here but use in __init__.py

db = SQLAlchemy()
jwt = JWTManager()