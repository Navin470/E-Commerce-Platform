from app.models.admin_model import Admin
from app.extensions import db

def create_admin(user_id, is_super_admin=False):
    if Admin.query.filter_by(user_id=user_id).first():
        return None, "Admin already exists"

    admin = Admin(user_id=user_id, is_super_admin=is_super_admin)
    db.session.add(admin)
    db.session.commit()
    return admin, None


def get_all_admins():
    return Admin.query.all()


def get_admin_by_user_id(user_id):
    return Admin.query.filter_by(user_id=user_id).first()


def is_user_admin(user_id):
    admin = Admin.query.filter_by(user_id=user_id).first()
    return admin is not None