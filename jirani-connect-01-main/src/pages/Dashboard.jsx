import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Package, Inbox, TrendingUp, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch user's donations and requests
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || !token) return;

      try {
        setLoading(true);

        // Fetch all food items
        const foodRes = await fetch("http://localhost:5000/api/foods");
        const foodData = await foodRes.json();

        // Fetch user requests
        const requestRes = await fetch("http://localhost:5000/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const requestData = await requestRes.json();

        // Filter user's data
        const myFoods = foodData.filter(
          (item) => item.postedBy === user.id || item.postedBy === user._id
        );
        const myRequests = requestData.filter(
          (req) => req.requestedBy === user.id || req.requestedBy === user._id
        );

        setFoods(myFoods);
        setRequests(myRequests);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
        toast.error("Error loading dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, token]);

  const totalImpact = foods.length + requests.length;

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // ✅ Cancel pending request
  const handleCancelRequest = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to cancel request");
      setRequests(requests.filter((r) => r._id !== id));
      toast.success("Request cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error cancelling request.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                {user ? `Welcome, ${user.name}` : "Dashboard"}
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your food donations and requests easily
              </p>
            </div>

            {user && (
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline" onClick={() => navigate("/account")}>
                  My Account
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default">
              <Link to="/add-food">
                <Plus className="mr-2 h-4 w-4" /> List Your Food
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/dashboard/browse-donations">
                <Package className="mr-2 h-4 w-4" /> Browse Donations
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link to="/dashboard/browse-donations">
                <Inbox className="mr-2 h-4 w-4" /> Request Food
              </Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Active Donations
                </CardTitle>
                <CardDescription>
                  Food items you’re currently sharing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {loading ? "..." : foods.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-secondary" />
                  Pending Requests
                </CardTitle>
                <CardDescription>
                  Requests awaiting approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  {loading ? "..." : requests.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Total Impact
                </CardTitle>
                <CardDescription>
                  Meals shared with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {loading ? "..." : totalImpact}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Food Requests Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🍽️ My Food Requests
            </h2>

            {loading ? (
              <p>Loading your requests...</p>
            ) : requests.length === 0 ? (
              <p className="text-gray-500">
                You have not made any food requests yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {requests.map((req) => (
                  <Card
                    key={req._id}
                    className="shadow-md hover:shadow-lg transition border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    {req.foodId?.image && (
                      <img
                        src={req.foodId.image}
                        alt={req.foodId.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-green-700">
                        {req.foodId?.title || "Food Item"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-2">
                      <p className="text-sm">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`${
                            req.status === "approved"
                              ? "text-green-600"
                              : req.status === "pending"
                              ? "text-yellow-600"
                              : "text-gray-500"
                          } font-medium`}
                        >
                          {req.status.charAt(0).toUpperCase() +
                            req.status.slice(1)}
                        </span>
                      </p>

                      {req.foodId?.address && (
                        <p className="text-sm">
                          <strong>Pickup:</strong> {req.foodId.address}
                        </p>
                      )}

                      <p className="text-sm">
                        <strong>Requested On:</strong>{" "}
                        {new Date(req.createdAt).toLocaleDateString()}
                      </p>

                      {req.status === "pending" && (
                        <Button
                          onClick={() => handleCancelRequest(req._id)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white mt-3"
                        >
                          Cancel Request
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
