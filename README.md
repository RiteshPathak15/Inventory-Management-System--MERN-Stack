# Inventory Management System (MERN Stack)

An efficient inventory management system for hardware shops, built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application helps manage inventory, track sales, and streamline shop operations.

## Features

- User authentication with OTP verification and avatar upload
- Role-based access (admin, employee)
- Add, update, and delete products
- Real-time inventory tracking and low-stock alerts
- Sales and purchase management
- Supplier management and reporting
- Email notifications for orders and registration

## Tech Stack

- **Frontend:** React.js, Axios, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, JWT, bcrypt.js, Cloudinary
- **Database:** MongoDB

## Folder Structure

`backend/ src/ controllers/ models/ routes/ utils/ mailer/ config/ `
`frontend/ src/ components/ pages/ assets/`

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Cloudinary account (for avatar uploads)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/RiteshPathak15/Inventory-Management-System--MERN-Stack.git
   cd Inventory-Management-System--MERN-Stack
   ```
2. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
3. Install the dependencies:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   cd ..
   ```
4. Create a `.env` file and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```
5. Start the server:
   ```sh
   npm start
   ```

## Option 1: Using Two Terminals

````
# Terminal 1 (Backend) :

```cd backend
npm run dev ```

# Terminal 2 (Frontend):
```cd frontend
npm run dev```
````

## Option 2: Using Two Terminals

````
# 1. Install concurrently in the root folder:
```npm install concurrently --save-dev```


# 2. Add this script to your root package.json:
```// ...existing code...
"scripts": {
  "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""
}
// ...existing code...```

# 3.Run both servers with one command:
```npm run dev```

````

## Usage

1. Register a new account or log in with an existing account.
2. Admins can manage products, categories, and users.
3. Employees can view and update inventory, and process sales.
4. All users can view their profile and update their information.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a pull request
