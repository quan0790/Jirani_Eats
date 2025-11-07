import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RequestsDashboard = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("❌ Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Food Requests</h1>
        {requests.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req._id} className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold">{req.foodType}</h2>
                <p>{req.message}</p>
                <small className="text-muted-foreground">
                  Submitted on {new Date(req.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RequestsDashboard;
