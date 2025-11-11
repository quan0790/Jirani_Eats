🌍 Jirani Eats

Jirani Eats is a community-driven food sharing and access platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
It directly supports the United Nations Sustainable Development Goal (SDG) 2 — Zero Hunger, by connecting individuals, restaurants, and organizations to share surplus food and ensure no one in the community goes hungry.

💡 Vision

To create a sustainable digital ecosystem where no meal goes to waste, and every person has access to nutritious food.

Jirani Eats empowers local communities to reduce food waste, redistribute excess meals, and support those in need through seamless digital collaboration and transparency.

🚀 Key Features
Category	Description
🥗 Food Donations	Individuals, restaurants, and groups can donate surplus food directly through the platform.
🙌 Food Requests	Recipients or community organizations can request food easily.
👤 User Profiles & Authentication	Donors, recipients, and volunteers can register, log in, and manage their accounts securely (JWT-based).
🏠 Community Food Map (Upcoming)	Visualize nearby donation and collection points.
📅 Real-Time Updates	Track available food donations, requests, and pickup times.
📦 Inventory Management	For organizations handling bulk or recurring food donations.
💬 Contact & Support Center	Integrated contact page and automated messaging system.
🖼️ Gallery Page	Visual showcase of food drives, donations, and community impact.
🔔 Notifications	Stay updated on new donations, requests, and pickups.
💚 Impact Tracking	View the total amount of food saved and people served.
✅ Request Approval Workflow	Donors can approve or reject incoming requests directly from their dashboard.
🧱 Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS, ShadCN UI Components
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
Authentication	JWT, bcrypt
API Communication	RESTful APIs (Axios / Fetch)
Deployment	Render / Vercel / Netlify / MongoDB Atlas
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/quan0790/Jirani_Eats.git
cd Jirani_Eats

2️⃣ Install Dependencies

Backend:

cd backend
npm install


Frontend:

cd ../jirani-connect-01-main
npm install

3️⃣ Set Up Environment Variables

Backend (backend/.env):

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_key


Frontend (jirani-connect-01-main/.env):

VITE_API_URL=http://localhost:5000

4️⃣ Run the Project

Start Backend:

cd backend
npm run dev


Start Frontend:

cd ../jirani-connect-01-main
npm run dev


Frontend: http://localhost:5173

Backend: http://localhost:5000

🗂️ Folder Structure
Jirani_Eats/
│
├── backend/
│   ├── config/             # Database & environment config
│   ├── controllers/        # Core business logic (auth, food, user, requests)
│   ├── models/             # Mongoose schemas (User, FoodItem, FoodRequest)
│   ├── routes/             # REST API endpoints
│   ├── middleware/         # JWT authentication and access control
│   ├── server.js           # Express app entry point
│   └── .env
│
├── jirani-connect-01-main/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Navbar, Footer, and UI components
│   │   ├── context/        # Global state (Auth, AppContext)
│   │   ├── pages/          # Pages (Home, About, DonateFood, RequestFood, Gallery, Contacts)
│   │   ├── assets/         # Project images
│   │   ├── App.jsx         # App routes and layout
│   │   └── index.css       # Styling configuration
│   └── vite.config.js
│
└── README.md

🤝 Community Impact

♻️ Reduces food waste by redistributing excess meals.

🥦 Improves food security through localized sharing.

🤲 Empowers communities to collaborate digitally.

🌱 Supports UN SDG 2 (Zero Hunger) — promoting sustainable solutions.

✅ Request/Approval workflow allows donors to manage contributions effectively.

👥 Contributing

We welcome open-source contributions!

How to Contribute:

# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/YourFeatureName

# 3. Commit your changes
git commit -m "Add new feature: YourFeatureName"

# 4. Push your branch
git push origin feature/YourFeatureName

# 5. Create a Pull Request 🚀