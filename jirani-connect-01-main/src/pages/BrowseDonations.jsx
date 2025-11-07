import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BrowseDonations = () => {
  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch all available food and user's requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodsRes, reqRes] = await Promise.all([
          fetch("http://localhost:5000/api/foods"),
          token
            ? fetch("http://localhost:5000/api/requests", {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.resolve({ ok: false }),
        ]);

        const foodData = await foodsRes.json();
        console.log("🍽️ Food data from API:", foodData); // Debugging log

        const reqData = reqRes.ok ? await reqRes.json() : [];

        if (!foodsRes.ok) {
          throw new Error(foodData.message || "Failed to load food donations");
        }

        setFoods(Array.isArray(foodData) ? foodData : []);
        setRequests(Array.isArray(reqData) ? reqData : []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        toast.error("Error loading available food.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Handle food request navigation
  const handleRequest = (foodId) => {
    if (!token) {
      toast.error("Please log in first.");
      return navigate("/auth");
    }
    navigate(`/request-food?foodId=${foodId}`);
  };

  // ✅ Check if user already requested this food
  const hasRequested = (foodId) => {
    return requests.some((req) => req.foodId === foodId || req.food === foodId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700">
          🌱 Browse Available Food Donations
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover nutritious food shared by your community. Click below to
          request available meals and help reduce food waste.
        </p>

        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading food items...
          </p>
        ) : foods.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No food donations available at the moment. Please check back later.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {foods.map((food) => (
              <Card
                key={food._id}
                className="shadow-md hover:shadow-xl transition border border-gray-200 rounded-2xl overflow-hidden bg-white"
              >
                {/* ✅ Placeholder Image */}
                <div className="h-40 w-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-lg">
                  🍴 {food.title?.slice(0, 15) || "Food Item"}
                </div>

                <CardHeader>
                  <CardTitle className="text-green-700 text-lg font-semibold truncate">
                    {food.title || "Untitled"}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-gray-700 space-y-2">
                  <p className="text-sm line-clamp-3">
                    {food.description || "No description provided."}
                  </p>
                  <p className="text-sm">
                    <strong>Quantity:</strong> {food.quantity}{" "}
                    {food.unit || ""}
                  </p>
                  <p className="text-sm">
                    <strong>Pickup:</strong>{" "}
                    {food.pickupLocation?.address || "Not specified"}
                  </p>
                  <p className="text-sm">
                    <strong>Expiry:</strong>{" "}
                    {food.expiryDate
                      ? new Date(food.expiryDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <Button
                    onClick={() => handleRequest(food._id)}
                    disabled={hasRequested(food._id)}
                    className={`w-full mt-3 ${
                      hasRequested(food._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {hasRequested(food._id)
                      ? "Already Requested"
                      : "Request Food"}
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
