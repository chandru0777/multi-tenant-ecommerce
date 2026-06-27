#  ShopEase - Multi Vendor E-Commerce Platform

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styled-38B2AC?logo=tailwind-css)

A **full-stack Multi Vendor E-Commerce Platform** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The platform provides separate modules for **Customers**, **Vendors**, and **Administrators**, enabling secure authentication, product management, order processing, analytics, and role-based access control.

---

#  Project Overview

ShopEase is designed to simulate a real-world multi-vendor e-commerce application where:

- Customers can browse products, place orders, and track them.
- Vendors can manage their stores, products, and customer orders.
- Admins can manage users, vendors, products, and platform activities.

The project follows a modular architecture with a REST API backend and a responsive React frontend.

---

#  Features

##  Customer

- User Registration & Login
- JWT Authentication
- Browse Products
- Search Products
- Category Filtering
- Product Details
- Add to Cart
- Buy Now
- Checkout
- Address Validation
- Order History
- Order Status Tracking

---

##  Vendor

- Vendor Dashboard
- Create Store
- My Store
- Add Products
- Edit Products
- Delete Products
- Manage Products
- Manage Orders
- Update Order Status
- Dashboard Analytics
- Recent Orders

---

##  Admin

- Admin Dashboard
- Manage Users
- Change User Roles
- Manage Products
- Manage Orders
- Platform Analytics

---

#  Authentication & Security

- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Role-Based Authorization
- Secure REST APIs
- Vendor Resource Protection
- Admin Access Control

---

#  Tech Stack

## Frontend

- React.js
- React Router DOM
- Context API
- Tailwind CSS
- JavaScript (ES6+)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Development Tools

- Git
- GitHub
- Thunder Client
- MongoDB Compass
- VS Code

---

#  Project Structure

```

ShopEase/

├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── layouts/
│ │ ├── pages/
│ │ ├── routes/
│ │ ├── App.jsx
│ │ └── main.jsx
│
├── server/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── utils/
│ └── server.js

```

---

# 🗄 Database Models

### User

- Name
- Email
- Password
- Role

### Store

- Store Name
- Owner

### Product

- Name
- Description
- Category
- Price
- Stock
- Image
- Store

### Cart

- User
- Product
- Quantity

### Order

- User
- Products
- Quantity
- Total Price
- Customer Name
- Phone Number
- Shipping Address
- Order Status
- Payment Status

---

