import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const AddFood = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: "",
    unit: "portion",
    address: "",
    expiryDate: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to list food donations.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          quantity: form.quantity,
          unit: form.unit,
          expiryDate: form.expiryDate,
          pickupLocation: { address: form.address },
        }),
      });

      if (res.ok) {
        toast.success("✅ Food listed successfully!");
        setForm({
          title: "",
          description: "",
          quantity: "",
          unit: "portion",
          address: "",
          expiryDate: "",
        });
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to list food.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 🌿 Navbar */}
      <Navbar />

      {/* 🥗 Main Form Section */}
      <main className="flex-1 container mx-auto px-4 py-12 flex justify-center items-start">
        <Card className="w-full max-w-lg shadow-lg border border-gray-200 bg-white rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-green-700">
              🍲 List Your Food
            </CardTitle>
            <CardDescription className="text-gray-600">
              Share surplus food with those in need. Fill in the details below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Food Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Cooked Rice, Bread, Fruits"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief description of the food (optional)"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="3"
                />
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    placeholder="e.g., portions, kg"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              {/* Pickup Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g., 123 Nairobi St, CBD"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200"
              >
                {loading ? "Listing..." : "List Food"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* 🌾 Footer */}
      <Footer />
    </div>
  );
};

export default AddFood;
