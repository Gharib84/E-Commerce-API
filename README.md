# E-Commerce API

## Overview

E-Commerce-API is a robust and scalable RESTful API designed to power modern e-commerce platforms. Built with cutting-edge technologies, this backend solution provides comprehensive functionalities for managing products, users, orders, and payments.

## Key Features

### Product Management
- Create, read, update, and delete products
- AI-powered product description validation using Google Gemini
- Structured product specifications
- Product image URL management

### User Management
- Secure user registration and authentication
- JWT-based user authentication
- User profile retrieval by ID or username

### Order Management
- Full CRUD operations for orders
- Advanced order status tracking
- Complex relationships between users, orders, and products

## Technologies Stack

- **NestJS:** Powerful Node.js framework for scalable server-side applications
- **TypeScript:** Typed superset of JavaScript
- **TypeORM:** Object-Relational Mapping library
- **PostgreSQL:** Reliable relational database
- **Docker:** Containerization platform
- **Google Gemini AI:** Advanced AI for product description validation
- **Swagger:** Interactive API documentation

## Advanced Features

- **Authentication:** Secure JWT-based route protection
- **Validation:** Comprehensive data validation with class-validator
- **Error Handling:** Standardized error response mechanism
- **Pagination:** Efficient data retrieval with pagination support
- **Documentation:** Swagger-integrated interactive API docs

## Prerequisites

- Node.js (v20+)
- npm or yarn
- Docker & Docker Compose (recommended)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Gharib84/E-Commerce-API.git
cd ecommerce-api
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.example.local .env.local

# Fill in your credentials in .env.local
# Update:
# - PostgreSQL credentials
# - Gemini API key
# - JWT secret
```

### 4. Run with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Services:
# - API: http://localhost:3000/api
# - pgAdmin: http://localhost:8081
```

## API Documentation

Once the application is running, access the Swagger documentation at:
`http://localhost:3000/api`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/Gharib84/E-Commerce-API](https://github.com/Gharib84/E-Commerce-API)

---

**Tip:** Make sure to replace placeholders in `.env.local` with your actual credentials before running the application.