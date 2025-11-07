import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RequestFood = () => {
  const [food, setFood] = useState(null);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    message: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const foodId = new URLSearchParams(location.search).get("foodId");

  useEffect(() => {
    if (!foodId) return;
    const fetchFood = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/foods/${foodId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch food item");
        setFood(data);
      } catch (error) {
        console.error("❌ Error fetching food:", error);
        toast.error("Could not load food details.");
      }
    };
    fetchFood();
  }, [foodId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in first.");
      return navigate("/auth");
    }

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodId,
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send request");

      toast.success("Food request submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Request error:", err);
      toast.error("Error submitting request. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
          Request Food
        </h1>

        {food && (
          <div className="mb-6 p-4 border rounded-lg bg-green-50">
            <h2 className="text-xl font-semibold text-green-700">{food.title}</h2>
            <p className="text-sm text-gray-700 mt-1">{food.description}</p>
            <p className="text-sm mt-1">
              <strong>Location:</strong> {food.address || "Not provided"}
            </p>
            <p className="text-sm">
              <strong>Expires:</strong>{" "}
              {food.expiryDate
                ? new Date(food.expiryDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="pickupLocation"
            placeholder="Enter your pickup location"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Additional details (e.g. preferred pickup time, contact info)"
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Submit Request
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default RequestFood;
