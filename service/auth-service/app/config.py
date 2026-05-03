import os

class Config:
    FRONTEND_URL = os.getenv("http://192.168.127.2:30007", "*") # '*' allows all for debugging
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key")