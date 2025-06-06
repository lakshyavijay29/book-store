# 📚 Book Review App

## 🛠️ Setup & Installation

### Clone and Install
```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

### Environment Configuration
Create a `.env` file in the root directory with the following:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-database-name
ACCESS_TOKEN_SECRET=your_jwt_secret_here
```

### Running the Server
```bash
npm start
```

## 🔧 API Examples

### 🔐 Authentication

#### Login
```bash
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
--data '{
  "username": "Lucky",
  "password": "Lucky"
}'
```

#### Signup
```bash
curl --location 'http://localhost:3000/signup' \
--header 'Content-Type: application/json' \
--data '{
  "username": "Lucky",
  "password": "Lucky"
}'
```

### 📖 Book Management

#### Add Book
```bash
curl --location 'http://localhost:3000/books' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
--data '{
  "name": "Harry Potter and the Goblet of Fire",
  "author": "JK Rowling",
  "genre": "Fantasy"
}'
```

#### Get Books (with optional genre filter)
```bash
curl --location 'http://localhost:3000/books?genre=Fantasy'
```

#### Get Book by ID
```bash
curl --location 'http://localhost:3000/books/<BOOK_ID>'
```

### 🔍 Search

#### Search by Author or Title
```bash
curl --location 'http://localhost:3000/search?author=Rowling'
```

### ⭐ Review Management

#### Add Review
```bash
curl --location 'http://localhost:3000/books/<BOOK_ID>/reviews' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
--data '{
  "rating": 2,
  "comment": "Normie!"
}'
```

#### Update Review
```bash
curl --location --request PUT 'http://localhost:3000/reviews/<REVIEW_ID>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
--data '{
  "rating": 3,
  "comment": "Very disturbing story!"
}'
```

#### Delete Review
```bash
curl --location --request DELETE 'http://localhost:3000/reviews/<REVIEW_ID>' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>'
```

## 🧩 Schema Descriptions

### 👤 User Schema (`models/User.js`)
- **username**: `String` – Required, unique. Acts as the user's identifier.
- **password**: `String` – Required. Stores the user's hashed password.
- **Collection Name**: `users`

---

### 📝 Review Schema
- **user**: `String` – Required. References the `username` of the user who wrote the review.  
  > 🔁 *Note: For better population support, consider changing this to `ObjectId` referencing the User model.*
- **book**: `ObjectId` – Required. References the book being reviewed (`Book` model).
- **rating**: `Number` – Required. Value between 1 and 5.
- **comment**: `String` – Optional. User’s feedback or opinion.
- **Timestamps**: Automatically includes `createdAt` and `updatedAt`.

---

### 📚 Book Schema
- **name**: `String` – Required. The title of the book.
- **author**: `String` – Required. The author's name.
- **genre**: `String` – Required. Genre or category of the book.
- **Timestamps**: Automatically includes `createdAt` and `updatedAt`.


## 📋 Assumptions

### User Management
- **Unique usernames**: All usernames are assumed to be unique across the system. Duplicate usernames are not allowed during user registration.