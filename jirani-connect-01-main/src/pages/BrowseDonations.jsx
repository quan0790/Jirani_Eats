// Only receivers can request food
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { io } from "socket.io-client";

const BrowseDonations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [foodsRes, reqRes] = await Promise.all([
        fetch("https://jirani-eats-6.onrender.com/api/foods"),
        token ? fetch("https://jirani-eats-6.onrender.com/api/requests", { headers: { Authorization: `Bearer ${token}` } }) : Promise.resolve({ ok: false }),
      ]);

      const foodData = await foodsRes.json();
      const reqData = reqRes.ok ? await reqRes.json() : [];

      setFoods(Array.isArray(foodData) ? foodData : []);
      setRequests(Array.isArray(reqData) ? reqData : []);
    } catch (err) {
      console.error(err);
      toast.error("Error loading food.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user?.role !== "user") navigate("/dashboard"); // Only receivers can request

    fetchData();
    const socket = io("https://jirani-eats-6.onrender.com", { auth: { token } });

    socket.on("foodAdded", (food) => setFoods((prev) => [food, ...prev]));
    socket.on("requestAdded", (request) => setRequests((prev) => [request, ...prev]));

    return () => socket.disconnect();
  }, [fetchData, token, user, navigate]);

  const handleRequest = (foodId) => {
    if (!token) {
      toast.error("Please log in first.");
      return navigate("/auth");
    }
    navigate(`/request-food?foodId=${foodId}`);
  };

  const hasRequested = (foodId) => requests.some((req) => req.foodId === foodId || req.food === foodId);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700">🌱 Browse Food Donations</h1>
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading food items...</p>
        ) : foods.length === 0 ? (
          <p className="text-center text-gray-500">No food donations available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {foods.map((food) => (
              <Card key={food._id} className="shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden">
                <div className="h-40 w-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-lg">🍴 {food.title?.slice(0, 15) || "Food"}</div>
                <CardHeader>
                  <CardTitle className="text-green-700 text-lg font-semibold truncate">{food.title || "Untitled"}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 space-y-2">
                  <p className="text-sm line-clamp-3">{food.description || "No description"}</p>
                  <p className="text-sm"><strong>Quantity:</strong> {food.quantity} {food.unit}</p>
                  <p className="text-sm"><strong>Pickup:</strong> {food.pickupLocation?.address || "N/A"}</p>
                  <p className="text-sm"><strong>Expiry:</strong> {food.expiryDate ? new Date(food.expiryDate).toLocaleDateString() : "N/A"}</p>
                  <Button
                    onClick={() => handleRequest(food._id)}
                    disabled={hasRequested(food._id)}
                    className={`w-full mt-3 ${hasRequested(food._id) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                  >
                    {hasRequested(food._id) ? "Already Requested" : "Request Food"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrowseDonations;
