# 🌍 Jirani Eats

**Jirani Eats** is a community-driven food sharing and access platform built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It supports the **United Nations Sustainable Development Goal (SDG) 2 — Zero Hunger**, by connecting individuals, restaurants, and organizations to share surplus food and ensure that no one in the community goes hungry.

---

## 💡 Vision

> To create a sustainable digital ecosystem where no meal goes to waste and every person has access to nutritious food.

**Jirani Eats** empowers communities to reduce food waste, redistribute excess meals, and support those in need through collaboration and technology.

---

## 🚀 Key Features

- 🥗 **Food Donations** – Individuals and restaurants can list surplus food for collection or redistribution.  
- 🧍 **User Profiles** – Donors, volunteers, and recipients can register and connect.  
- 🏠 **Community Food Map** – View nearby food donation points, kitchens, and distribution centers.  
- 📅 **Real-Time Availability** – Track when and where food is available for pickup.  
- 📦 **Inventory Management** – For organizations managing large donations.  
- 🔔 **Notifications** – Alerts for new food listings and pickup schedules.  
- 💚 **Impact Tracking** – Measure total food saved and people reached.  

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT, bcrypt |
| Deployment | Render / Vercel / Netlify / MongoDB Atlas |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/quan0790/Jirani_Eats.git
cd Jirani_Eats
2️⃣ Install dependencies
Backend
bash
Copy code
cd backend
npm install
Frontend
bash
Copy code
cd ../frontend
npm install
3️⃣ Set up environment variables
Create a .env file inside backend/:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Optional (if you plan to add cloud storage or payment):

env
Copy code
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_key
4️⃣ Run the project
Start the backend:
bash
Copy code
cd backend
npm run dev
Start the frontend:
bash
Copy code
cd ../frontend
npm start
App will run on:

Frontend → http://localhost:3000

Backend → http://localhost:5000

🗂️ Folder Structure
bash
Copy code
Jirani_Eats/
│
├── backend/
│   ├── config/           # Database & environment configuration
│   ├── controllers/      # Core business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── server.js         # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Screens and views
│   │   ├── context/      # Global state (e.g. Auth, Data)
│   │   └── App.js
│   └── package.json
│
└── README.md
🤝 How It Helps the Community
♻️ Reduces food waste by redistributing excess food.

🥦 Improves food security by connecting donors and recipients.

🤲 Empowers communities to share resources locally.

🌱 Promotes sustainability aligned with UN SDG 2: Zero Hunger.

👥 Contributing
We welcome contributors passionate about sustainability and community impact.

Fork the repo

Create your branch: git checkout -b feature/YourFeature

Commit changes: git commit -m 'Add feature'

Push: git push origin feature/YourFeature

Submit a Pull Request 🚀
