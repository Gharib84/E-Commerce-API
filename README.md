# E-Commerce-API

E-Commerce-API is a robust and scalable RESTful API designed to power modern e-commerce platforms. Built with NestJS (TypeScript), TypeORM, and PostgreSQL, this API provides essential functionalities for managing products, users, orders, and payments, making it a perfect backend solution for e-commerce applications.

## Features

*   **Product Management:**
    *   Create, read, update, and delete products.
    *   Detailed product descriptions with validation using Google's Gemini AI.
    *   Structured product specifications.
    *   Image URLs for products.
*   **User Management:**
    *   User registration and login.
    *   Secure password handling.
    *   User authentication via JWT.
    * Get users by id or username
*   **Order Management:**
    *   Create, read, update, and delete orders.
    *   Order status tracking.
    *   Relationship between users, orders, and products.
*   **Authentication and Authorization:**
    *   JWT-based authentication to secure API endpoints.
    *   `AuthGuard` for route protection.
*   **Database:**
    *   PostgreSQL database for reliable data storage.
    *   TypeORM for object-relational mapping.
*   **API Documentation:**
    *   Swagger integration for interactive API documentation.
*   **Validation:**
    *   Class-validator for data validation using decorators.
    *   Custom validator constraints (`ProductDescription`, `ProductSpecs`).
*   **Error Handling:**
    *   `HttpExceptionFilter` for standardized error responses.
*   **Pagination:**
    *   `PaginationService` for paginated responses.
*   **Environment Variables:**
    *   `.env.example.local` file for managing environment variables.
*   **Docker Support:**
    *   `docker-compose.yml` for easy setup with PostgreSQL and pgAdmin.

## Technologies Used

*   **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **TypeORM:** An ORM that can run in Node.js, allowing you to work with databases using TypeScript.
*   **PostgreSQL:** A powerful, open-source relational database system.
*   **JWT (JSON Web Tokens):** An open standard for creating data with optional signature and/or optional encryption whose payload holds JSON.
*   **Swagger:** An open-source software design tool suite for building and documenting RESTful APIs.
*   **Docker:** A platform for developing, shipping, and running applications inside containers.
*   **Google Gemini AI:** A Generative AI model for validating product descriptions.
*   **Class-validator:** A library that allows you to use decorator and non-decorator-based validation on your classes and plain objects.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn
*   Docker and Docker Compose (recommended for local setup)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Gharib84/E-Commerce-API.git
    cd ecommerce-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Environment Variables:**

    *   Copy `.env.example.local` to `.env.local`:

        ```bash
        cp .env.example.local .env.local
        ```

    *   Fill in the `.env.local` file with your PostgreSQL credentials, Gemini API key, and JWT secret.

        ```
        POSTGRES_HOST=localhost
        POSTGRES_PORT=5432
        POSTGRES_USER=your_postgres_user
        POSTGRES_PASSWORD=your_postgres_password
        POSTGRES_DB=your_postgres_database
        GEMINI_API_KEY=your_gemini_api_key
        JWT_SECRET=your_jwt_secret
        ```

### Running the Application

#### Using Docker (Recommended)

1.  **Start the Docker containers:**

    ```bash
    docker-compose up -d
    ```

    This will start the PostgreSQL database, pgAdmin (for database management), and the NestJS application in separate containers.
    pgAdmin will be avalaible on `http://localhost:8081`

2.  **Wait for the Database:**

    Wait for the PostgreSQL database to be fully initialized. This may take a few moments.

3.  **Access the API:**

    The API will be available at `http://localhost:3000/api`.
