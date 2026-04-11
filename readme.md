
# 🌐 BASE URLS (UPDATED)

| Service         | Base URL                |
| --------------- | ----------------------- |
| Auth Service    | `http://localhost:5002` |
| User Service    | `http://localhost:5005` |
| Product Service | `http://localhost:5004` |
| Order Service   | `http://localhost:5003` |
| Admin Service   | `http://localhost:5001` |

---

# 🔐 AUTH SERVICE

Base: `http://localhost:5002`

### 1. Health

* **GET** `/auth/health`

---

### 2. Register

* **POST** `/auth/register`

📥

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

### 3. Login

* **POST** `/auth/login`

📥

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

📤

```json
{
  "access_token": "JWT_TOKEN",
  "user": {}
}
```

---

### 4. Validate Token

* **GET** `/auth/validate`
* 🔐 Required

---

# 👤 USER SERVICE

Base: `http://localhost:5005`

### 1. Health

* **GET** `/users/health`

---

### 2. Get Profile

* **GET** `/users/profile`
* 🔐 Required

---

### 3. Create / Update Profile

* **POST / PUT** `/users/profile`
* 🔐 Required

📥

```json
{
  "name": "Ankur",
  "phone": "9999999999"
}
```

---

### 4. Get Profile by ID

* **GET** `/users/profile/<id>`
* 🔐 Required

---

# 📦 PRODUCT SERVICE

Base: `http://localhost:5004`

### 1. Health

* **GET** `/products/health`

---

### 2. Get All Products

* **GET** `/products/products`

Example:

```
/products/products?search=phone&min_price=1000
```

---

### 3. Get Product by ID

* **GET** `/products/products/<id>`

---

### 4. Create Product

* **POST** `/products/products`

📥

```json
{
  "name": "Laptop",
  "price": 50000
}
```

---

### 5. Update Product

* **PUT** `/products/products/<id>`

---

### 6. Delete Product

* **DELETE** `/products/products/<id>`

---

# 🛒 ORDER SERVICE

Base: `http://localhost:5003`

### 1. Health

* **GET** `/orders/health`

---

### 2. Create Order

* **POST** `/orders/orders`
* 🔐 Required

📥

```json
{
  "items": [
    { "product_id": 1, "quantity": 2 }
  ]
}
```

---

### 3. Get My Orders

* **GET** `/orders/orders`
* 🔐 Required

---

### 4. Get Single Order

* **GET** `/orders/orders/<id>`
* 🔐 Required

---

### 5. Update Order Status

* **PUT** `/orders/orders/<id>/status`
* 🔐 Required

📥

```json
{
  "status": "SHIPPED"
}
```

---

# 🛡️ ADMIN SERVICE

Base: `http://localhost:5001`

### 1. Health

* **GET** `/admin/health`

---

### 2. Check Admin

* **GET** `/admin/check`
* 🔐 Required

---

### 3. Get All Admins

* **GET** `/admin/admins`
* 🔐 Required

---

### 4. Create Admin

* **POST** `/admin/admins`
* 🔐 Required

📥

```json
{
  "user_id": 2,
  "is_super_admin": true
}
```

---

### 5. Admin - Get All Products

* **GET** `/admin/products`
* 🔐 Required

---

### 6. Admin - Get All Orders

* **GET** `/admin/orders`
* 🔐 Required

---
