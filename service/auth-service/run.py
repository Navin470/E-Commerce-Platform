import time
from app import create_app, db

app = create_app()

with app.app_context():
    for i in range(10):
        try:
            db.create_all()
            print("✅ Database connected")
            break
        except Exception as e:
            print(f"⏳ Waiting for DB... ({i+1}/10)", e)
            time.sleep(2)
    else:
        print("❌ Could not connect to DB")
        exit(1)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)