Skip to content
Chat history


You said:
Skip to content
Navigation Menu
Apollo-Level2-Web-Dev
B6A2

Type / to search
Code
Issues
Pull requests
Actions
Projects
Security
Insights
Owner avatar
B6A2
Public
Apollo-Level2-Web-Dev/B6A2
Go to file
t
Name		
rakibh3
rakibh3
docs: add modular pattern requirement
b0b92e7
 · 
3 weeks ago
API_REFERENCE.md
feat: add vehicle rental API documentation
3 weeks ago
README.md
docs: add modular pattern requirement
3 weeks ago
SUBMISSION_GUIDE.md
feat: add vehicle rental API documentation
3 weeks ago
Repository files navigation
README
🚗 Vehicle Rental System
🎯 Project Overview
A backend API for a vehicle rental management system that handles:

Vehicles - Manage vehicle inventory with availability tracking
Customers - Manage customer accounts and profiles
Bookings - Handle vehicle rentals, returns and cost calculation
Authentication - Secure role-based access control (Admin and Customer roles)
🛠️ Technology Stack
Node.js + TypeScript
Express.js (web framework)
PostgreSQL (database)
bcrypt (password hashing)
jsonwebtoken (JWT authentication)
📁 Code Structure
IMPORTANT: Your implementation MUST follow a modular pattern with clear separation of concerns. Organize your code into feature-based modules (e.g., auth, users, vehicles, bookings) with proper layering (routes, controllers, services).

📊 Database Tables
Users
Field	Notes
id	Auto-generated
name	Required
email	Required, unique, lowercase
password	Required, min 6 characters
phone	Required
role	'admin' or 'customer'
Vehicles
Field	Notes
id	Auto-generated
vehicle_name	Required
type	'car', 'bike', 'van' or 'SUV'
registration_number	Required, unique
daily_rent_price	Required, positive
availability_status	'available' or 'booked'
Bookings
Field	Notes
id	Auto-generated
customer_id	Links to Users table
vehicle_id	Links to Vehicles table
rent_start_date	Required
rent_end_date	Required, must be after start date
total_price	Required, positive
status	'active', 'cancelled' or 'returned'
🔐 Authentication & Authorization
User Roles
Admin - Full system access to manage vehicles, users and all bookings
Customer - Can register, view vehicles, create/manage own bookings
Authentication Flow
Passwords are hashed using bcrypt before storage into the database
User login via /api/v1/auth/signin and receives a JWT (JSON Web Token)
Protected endpoints require token in header: Authorization: Bearer <token>
Validates the token and checks user permissions
Access granted if authorized, otherwise returns 401 (Unauthorized) or 403 (Forbidden)
🌐 API Endpoints
📖 For detailed request/response specifications, see the API Reference

⚠️ IMPORTANT: All API endpoint implementations MUST exactly match the specifications defined in API Reference. This includes:

Exact URL patterns (e.g., /api/v1/vehicles/:vehicleId)
Request body structure and field names
Response format and data structure
Authentication
Method	Endpoint	Access	Description
POST	/api/v1/auth/signup	Public	Register new user account
POST	/api/v1/auth/signin	Public	Login and receive JWT token
Vehicles
Method	Endpoint	Access	Description
POST	/api/v1/vehicles	Admin only	Add new vehicle with name, type, registration, daily rent price and availability status
GET	/api/v1/vehicles	Public	View all vehicles in the system
GET	/api/v1/vehicles/:vehicleId	Public	View specific vehicle details
PUT	/api/v1/vehicles/:vehicleId	Admin only	Update vehicle details, daily rent price or availability status
DELETE	/api/v1/vehicles/:vehicleId	Admin only	Delete vehicle (only if no active bookings exist)
Users
Method	Endpoint	Access	Description
GET	/api/v1/users	Admin only	View all users in the system
PUT	/api/v1/users/:userId	Admin or Own	Admin: Update any user's role or details
Customer: Update own profile only
DELETE	/api/v1/users/:userId	Admin only	Delete user (only if no active bookings exist)
Bookings
Method	Endpoint	Access	Description
POST	/api/v1/bookings	Customer or Admin	Create booking with start/end dates
• Validates vehicle availability
• Calculates total price (daily rate × duration)
• Updates vehicle status to "booked"
GET	/api/v1/bookings	Role-based	Admin: View all bookings
Customer: View own bookings only
PUT	/api/v1/bookings/:bookingId	Role-based	Customer: Cancel booking (before start date only)
Admin: Mark as "returned" (updates vehicle to "available")
System: Auto-mark as "returned" when period ends
📚 Additional Resources
API Reference - Detailed endpoint documentation with request/response examples
Submission Guide - Assignment submission requirements and deadlines
About
No description, website, or topics provided.
Resources
 Readme
 Activity
 Custom properties
Stars
 22 stars
Watchers
 0 watching
Forks
 14 forks
Report repository
Releases
No releases published
Packages
No packages published
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information
   give me a readme.md file about this project
ChatGPT said:
I’ve created a complete README.md for your Vehicle Rental System project in the canvas.

If you want, I can:

Adjust it exactly to match Apollo/B6A2 submission style

Simplify it for beginner-friendly evaluation

Add ER diagram, API examples, or Postman collection notes

Rewrite it to be 100% plagiarism-safe & unique wording

Just tell me what you want to tweak 👍

You said:
README.md: Must be professional and include:

Project Name & Live URL.
Features & Technology Stack.
Setup & Usage Instructions.follow this instruction
ChatGPT said:
Vehicle Rental System – Readme

🚗 Vehicle Rental System API
🔗 Live URL: https://your-live-api-url.vercel.app

A backend REST API for managing a Vehicle Rental System with secure authentication, role-based authorization, and complete booking lifecycle management.

This project is built following a modular, feature-based architecture using Node.js, TypeScript, Express, and PostgreSQL.

🎯 Project Overview
A production-ready backend REST API for a Vehicle Rental System, designed with scalability, security, and clean architecture in mind.

The Vehicle Rental System allows administrators and customers to manage vehicle rentals efficiently.

Core Features
Authentication & Authorization

JWT-based authentication

Role-based access control (Admin & Customer)

Vehicle Management

Add, update, view, and delete vehicles

Track vehicle availability status

User Management

Customer registration & profile management

Admin-level user control

Booking Management

Create vehicle bookings

Cancel or return rentals

Automatic rental cost calculation

✨ Key Features
JWT-based authentication and role-based authorization (Admin & Customer)

Modular, feature-based architecture (Auth, Users, Vehicles, Bookings)

Secure password hashing using bcrypt

Vehicle availability tracking

Dynamic booking cost calculation

Admin and customer-specific access control

RESTful API design following strict specifications

🛠️ Technology Stack
Runtime: Node.js

Language: TypeScript

Framework: Express.js

Database: PostgreSQL

Authentication: JSON Web Token (JWT)

Password Security: bcrypt

📁 Project Structure
⚠️ IMPORTANT: The project strictly follows a modular architecture with clear separation of concerns.

src/
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.routes.ts
│   │
│   ├── vehicles/
│   │   ├── vehicle.controller.ts
│   │   ├── vehicle.service.ts
│   │   ├── vehicle.routes.ts
│   │
│   ├── bookings/
│   │   ├── booking.controller.ts
│   │   ├── booking.service.ts
│   │   ├── booking.routes.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│
├── config/
│   ├── db.ts
│   ├── env.ts
│
├── app.ts
├── server.ts
📊 Database Schema
Users Table
Field	Description
id	Auto-generated
name	Required
email	Required, unique, lowercase
password	Required, min 6 characters
phone	Required
role	admin or customer
Vehicles Table
Field	Description
id	Auto-generated
vehicle_name	Required
type	car, bike, van, SUV
registration_number	Required, unique
daily_rent_price	Required, positive
availability_status	available or booked
Bookings Table
Field	Description
id	Auto-generated
customer_id	Foreign key → Users
vehicle_id	Foreign key → Vehicles
rent_start_date	Required
rent_end_date	Required (after start date)
total_price	Calculated
status	active, cancelled, returned
🔐 Authentication & Authorization
User Roles
Admin

Full system access

Manage users, vehicles, and all bookings

Customer

View vehicles

Create and manage own bookings

Authentication Flow
User registers or logs in

Passwords are hashed using bcrypt

On successful login, a JWT token is issued

Token must be sent via header:

Authorization: Bearer <token>
Protected routes validate token & user role

🌐 API Endpoints
📖 All endpoints must exactly match the API Reference specification.

Authentication
Method	Endpoint	Access	Description
POST	/api/v1/auth/signup	Public	Register new user
POST	/api/v1/auth/signin	Public	Login & receive JWT
Vehicles
Method	Endpoint	Access	Description
POST	/api/v1/vehicles	Admin	Add new vehicle
GET	/api/v1/vehicles	Public	View all vehicles
GET	/api/v1/vehicles/:vehicleId	Public	View vehicle details
PUT	/api/v1/vehicles/:vehicleId	Admin	Update vehicle
DELETE	/api/v1/vehicles/:vehicleId	Admin	Delete vehicle (if no active bookings)
Users
Method	Endpoint	Access	Description
GET	/api/v1/users	Admin	View all users
PUT	/api/v1/users/:userId	Admin / Own	Update profile or role
DELETE	/api/v1/users/:userId	Admin	Delete user (if no active bookings)
Bookings
Method	Endpoint	Access	Description
POST	/api/v1/bookings	Admin / Customer	Create booking
GET	/api/v1/bookings	Role-based	Admin: all / Customer: own
PUT	/api/v1/bookings/:bookingId	Role-based	Cancel or return booking
🧮 Booking Logic
Vehicle must be available to book

Total price is calculated as:

(daily_rent_price × number_of_days)
Vehicle status updates automatically

System auto-returns bookings after rental period

⚙️ Setup & Usage Instructions
Prerequisites
Node.js (v18+ recommended)

PostgreSQL

npm or yarn

Installation
npm install
Environment Variables
Create a .env file in the root directory and add:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_jwt_secret
Database Setup
Create a PostgreSQL database

Run migrations or sync schema as per project configuration

Run the Server (Development)
npm run dev
The API will be available at:

http://localhost:5000
Usage
Use Postman or Insomnia to test endpoints

Authenticate using /api/v1/auth/signin to receive JWT

Pass token in headers:

Authorization: Bearer <token>
Follow API_REFERENCE.md for exact request & response formats

Installation
npm install
Environment Variables
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
Run the Server
npm run dev
📚 Additional Documentation
 