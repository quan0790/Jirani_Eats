import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { io } from "socket.io-client";

const AddFood = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if user is not a donor
  useEffect(() => {
    if (user?.role === "user") {
      toast.error("You cannot donate food as a receiver.");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: "",
    unit: "portion",
    address: "",
    expiryDate: "",
  });

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const s = io("https://jirani-eats-6.onrender.com", { auth: { token } });
    setSocket(s);
    return () => s.disconnect();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please log in.");

    setLoading(true);
    try {
      const res = await fetch("https://jirani-eats-6.onrender.com/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, pickupLocation: { address: form.address } }),
      });

      if (res.ok) {
        const newFood = await res.json();
        toast.success("✅ Food listed successfully!");
        socket?.emit("foodAdded", newFood);
        setForm({ title: "", description: "", quantity: "", unit: "portion", address: "", expiryDate: "" });
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to list food.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="mb-6 text-left w-full max-w-lg">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
            ← Back to Dashboard
          </Button>
        </div>

        <Card className="w-full max-w-lg shadow-lg border border-gray-200 bg-white rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-green-700">🍲 List Your Food</CardTitle>
            <CardDescription className="text-gray-600">Share surplus food with those in need.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Food Title" required className="w-full border rounded p-2" />
              {/* Description */}
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="w-full border rounded p-2" rows={3} />
              {/* Quantity & Unit */}
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required className="w-full border rounded p-2" />
                <select name="unit" value={form.unit} onChange={handleChange} className="w-full border rounded p-2">
                  <option value="portion">Portion</option>
                  <option value="kg">Kg</option>
                  <option value="plates">Plates</option>
                  <option value="bottles">Bottles</option>
                  <option value="packets">Packets</option>
                </select>
              </div>
              {/* Address */}
              <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Pickup Address" required className="w-full border rounded p-2" />
              {/* Expiry */}
              <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="w-full border rounded p-2" />
              {/* Submit */}
              <Button type="submit" disabled={loading} className="w-full bg-green-600 text-white">{loading ? "Listing..." : "List Food"}</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AddFood;
