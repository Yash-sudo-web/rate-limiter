# Rate Limiter API

A Node.js RESTful API with Express, MongoDB, and Redis implementing a rate limiter middleware. The API manages a collection of books and restricts excessive requests per IP using Redis.

## Features
- RESTful API for managing books (CRUD)
- Rate limiting middleware (5 requests per minute per IP)
- MongoDB for data persistence
- Redis for rate limiting
- Written in TypeScript

## Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Redis](https://redis.io/) (local or cloud instance)

## Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd rate-limiter
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and set the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/mydatabase
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password (if required)
```

## Usage
Start the development server:
```bash
npm run dev
```
The server will run on `http://localhost:3000` by default.

## API Endpoints
Live URL - https://rate-limiter-1.onrender.com/

All endpoints are prefixed with `/api`.

### Add a Book
- **POST** `/api/books`
- **Body:** `{ "title": "Book Title", "author": "Author Name" }`
- **Response:** Created book object

### Get All Books
- **GET** `/api/books`
- **Response:** Array of all books

### Get Book by ID
- **GET** `/api/books/:id`
- **Response:** Book object or 404 if not found

## Rate Limiting
- Each IP is limited to 5 requests per minute.
- Exceeding the limit returns HTTP 429: `Too many requests. Please try again later.`

## Project Structure
```
rate-limiter/
├── src/
│   ├── config/         # Database and Redis configuration
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Rate limiter middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.ts       # Entry point
├── package.json
├── tsconfig.json
└── README.md
```
