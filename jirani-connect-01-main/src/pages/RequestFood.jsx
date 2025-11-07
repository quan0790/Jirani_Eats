import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RequestFood = () => {
  const [formData, setFormData] = useState({
    foodType: "",
    message: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Error submitting request:", data);
        throw new Error(data.message || "Failed to send request");
      }

      console.log("✅ Request submitted:", data);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="foodType"
            placeholder="Type of food (e.g., Fruits, Vegetables, Meals)"
            value={formData.foodType}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Add a short note (e.g., number of people, preferred pickup time)"
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default RequestFood;
