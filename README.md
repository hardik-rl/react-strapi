🚀 React + Strapi CMS (Deployed Backend)

A React + Strapi Headless CMS project using GraphQL and Apollo Client, where the backend is deployed on Render and the frontend is deployed on Vercel.

🌐 Live URLs
🔹 Backend (Strapi – Render)

👉 https://react-strapi-1.onrender.com

Admin Panel:
https://react-strapi-1.onrender.com/admin

GraphQL Playground:
https://react-strapi-1.onrender.com/graphql

🔹 Frontend (React – Vercel)

👉 https://react-strapi-three.vercel.app

🧰 Tech Stack
Frontend

ReactJS

Apollo Client

GraphQL

Tailwind CSS

JavaScript / TypeScript

Backend

Strapi (Headless CMS)

GraphQL Plugin

Node.js

PostgreSQL (Render / external DB)

✨ Features

✔ Product & Blog Management using Strapi
✔ GraphQL-based API integration
✔ Apollo Client for data fetching & caching
✔ Fully decoupled frontend & backend
✔ Responsive UI with Tailwind CSS
✔ Deployed on modern cloud platforms (Render & Vercel)

📁 Project Structure
react-strapi
├── backend/        # Strapi CMS (Render)
├── frontend/       # React App (Vercel)
├── README.md
└── package.json

⚙️ Environment Variables
Frontend (.env)
REACT_APP_GRAPHQL_API=https://react-strapi-1.onrender.com/graphql


⚠️ On Vercel, add this in Project → Settings → Environment Variables

Backend (Render)

Set these in Render → Environment → Variables

NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url

🔐 Important: Permissions (Very Important)

After deploying Strapi:

Open Admin Panel

Go to Settings → Users & Permissions → Roles

Open Public

Enable required permissions for:

Articles

Products

Categories (if used)

Save changes

Otherwise, GraphQL will return Forbidden access errors.

🧪 GraphQL Example
query {
  articles {
    title
    slug
    description
  }
}

🚀 Local Development
Backend
cd backend
npm install
npm run develop

Frontend
cd frontend
npm install
npm start

🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to fork the repo and submit a pull request.
