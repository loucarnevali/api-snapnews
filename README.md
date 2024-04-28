# Snap News API

Snap News is a RESTful API designed to provide news management functionalities. It allows users to perform CRUD (Create, Read, Update, and Delete) operations on news articles, interact with them through likes and comments, search for articles, and manage user authentication and profiles.

## Features

- **User Authentication:** Register, login, and authenticate users using JWT (JSON Web Tokens).
- **News Management:** Create, read, update, and delete news articles.
- **Interactions:** Like news articles and add comments to them.
- **Search:** Search for news articles by title.
- **User Management:** View all users, view user profiles, and update user information.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

To get started with Snap News API, follow these steps:

1. Clone this repository to your local machine.
    ```
    git clone https://github.com/loucarnevali/api-snapnews.git
    ```

2. Install dependencies using npm:
    ```
    npm install
    ```

3. Set up your environment variables by creating a `.env` file based on the `.env.example` provided.

4. Make sure you have MongoDB installed and running on your machine.

5. Start the server:
    ```
    npm start
    ```

6. You can now access the API endpoints using a tool like Postman, Thunder Client or any HTTP client.

## API Documentation

For detailed documentation on how to use Snap News API, refer to the [API documentation](https://api-snapnews.onrender.com/doc/).
