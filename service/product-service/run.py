import time
from app import create_app, db

app = create_app()

with app.app_context():
    max_retries = 20
    for i in range(max_retries):
        try:
            db.create_all()
            print("✅ Database connected and tables created successfully")
            break
        except Exception as e:
            print(f"⏳ Waiting for database... ({i+1}/{max_retries}) - {str(e)[:200]}")
            time.sleep(4)   # increased sleep
    else:
        print("❌ Could not connect to database after maximum retries")
        exit(1)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004)   # change port for each service