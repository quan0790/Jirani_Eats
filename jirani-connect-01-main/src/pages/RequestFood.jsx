import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const RequestFood = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [food, setFood] = useState(null);
  const [requesting, setRequesting] = useState(false);

  // Form state
  const [pickupLocation, setPickupLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchFood = async () => {
      try {
        const res = await fetch(`https://jirani-eats-6.onrender.com/api/foods/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch food");
        const data = await res.json();
        setFood(data);
        // Pre-fill pickup location if available
        if (data.pickupLocation) {
          setPickupLocation(typeof data.pickupLocation === "object" ? data.pickupLocation.address : data.pickupLocation);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load food details");
      }
    };

    fetchFood();
  }, [id, token]);

  const handleRequest = async () => {
    if (!pickupLocation || !phoneNumber || !pickupTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setRequesting(true);
      const res = await fetch(`https://jirani-eats-6.onrender.com/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodId: id,
          pickupLocation,
          phoneNumber,
          pickupTime,
          status: "pending",
        }),
      });
      if (!res.ok) throw new Error("Failed to request food");

      toast.success("Food requested successfully!");
      navigate("/requests"); // Redirect to requests page
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error requesting food");
    } finally {
      setRequesting(false);
    }
  };

  if (!food) return <p className="text-center py-8">Loading food details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <main className="container mx-auto py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h1 className="text-3xl font-bold mb-4">{food.title}</h1>
          <p><strong>Quantity:</strong> {food.quantity} {food.unit}</p>
          <p>
            <strong>Pickup Location:</strong>{" "}
            {typeof food.pickupLocation === "object" ? food.pickupLocation.address : food.pickupLocation}
          </p>

          {/* Request Form */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Pickup Location"
              className="input w-full"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Phone Number"
              className="input w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="datetime-local"
              className="input w-full"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>

          <Button onClick={handleRequest} disabled={requesting} className="mt-4 w-full">
            {requesting ? "Requesting..." : "Request Food"}
          </Button>

          <Button onClick={() => navigate("/dashboard/browse-donations")} variant="outline" className="mt-2 w-full">
            Back to Donations
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestFood;
