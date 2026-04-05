from app.models.user_model import User
from app.extensions import db

def register_user(email, password):
    if User.query.filter_by(email=email).first():
        return None, "Email already exists"
    user = User(email=email, password=User.hash_password(password))
    db.session.add(user)
    db.session.commit()
    return user, None

def login_user(email, password):
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return None, "Invalid credentials"
    return user, None