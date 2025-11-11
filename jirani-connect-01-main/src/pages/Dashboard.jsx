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
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { io } from "socket.io-client";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!user || !token) return;
    try {
      setLoading(true);

      // Fetch foods
      const foodRes = await fetch("http://localhost:5000/api/foods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      let foodData = await foodRes.json();
      if (!Array.isArray(foodData)) foodData = [];

      // Fetch requests
      const requestRes = await fetch("http://localhost:5000/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      let requestData = await requestRes.json();
      if (!Array.isArray(requestData)) requestData = [];

      // Filter foods based on role
      let myFoods = [];
      if (user.role === "donor") {
        myFoods = foodData.filter(
          (item) => item.postedBy?._id === user._id || item.postedBy === user._id
        );
      } else if (user.role === "receiver") {
        myFoods = foodData; // Receivers see all donations
      }

      // Filter requests made by this user (receiver) or received by this donor
      let myRequests = [];
      if (user.role === "receiver") {
        myRequests = requestData.filter(
          (req) => req.requestedBy?._id === user._id || req.requestedBy === user._id
        );
      } else if (user.role === "donor") {
        myRequests = requestData.filter(
          (req) => req.food?.postedBy?._id === user._id || req.food?.postedBy === user._id
        );
      }

      setFoods(myFoods);
      setRequests(myRequests);
    } catch (err) {
      console.error("❌ Error fetching dashboard data:", err);
      toast.error("Error loading dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchDashboardData();

    const socket = io("http://localhost:5000", { auth: { token } });

    socket.on("foodAdded", (food) => {
      if (user?.role === "receiver") {
        setFoods((prev) => [food, ...prev]);
      } else if (user?.role === "donor" && food.postedBy?._id === user._id) {
        setFoods((prev) => [food, ...prev]);
      }
    });

    socket.on("requestAdded", (request) => {
      if (user.role === "receiver" && request.requestedBy?._id === user._id) {
        setRequests((prev) => [request, ...prev]);
      } else if (user.role === "donor" && request.food?.postedBy?._id === user._id) {
        setRequests((prev) => [request, ...prev]);
      }
    });

    socket.on("requestUpdated", (updated) => {
      setRequests((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    });

    return () => socket.disconnect();
  }, [fetchDashboardData, token, user]);

  const totalImpact = foods.length + requests.length;

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleUpdateRequest = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update request");
      toast.success(`Request ${status}!`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      toast.error("Error updating request");
    }
  };

  const renderString = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  // Quick Actions
  const donorActions = (
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="default">
        <Link to="/add-food">
          <Plus className="mr-2 h-4 w-4" /> Donate Your Food
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/dashboard/browse-donations">
          <Package className="mr-2 h-4 w-4" /> Browse Donations
        </Link>
      </Button>
    </div>
  );

  const receiverActions = (
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="secondary">
        <Link to="/dashboard/browse-donations">
          <Inbox className="mr-2 h-4 w-4" /> Request Food
        </Link>
      </Button>
    </div>
  );

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
          {user?.role === "donor" ? donorActions : receiverActions}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Active Donations
                </CardTitle>
                <CardDescription>Food items you’re currently sharing</CardDescription>
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
                <CardDescription>Requests awaiting approval</CardDescription>
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
                <CardDescription>Meals shared with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {loading ? "..." : totalImpact}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donor Section */}
          {user?.role === "donor" && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">🥘 My Donations</h2>
              {loading ? (
                <p>Loading your donations...</p>
              ) : foods.length === 0 ? (
                <p className="text-gray-500">You have not donated any food yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {foods.map((food) => (
                    <Card key={food._id} className="shadow-md hover:shadow-lg transition border border-gray-200 rounded-2xl overflow-hidden">
                      {food.image && (
                        <img src={renderString(food.image)} alt={renderString(food.title)} className="w-full h-40 object-cover" />
                      )}
                      <CardHeader>
                        <CardTitle className="text-blue-700">{renderString(food.title)}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-gray-700 space-y-2">
                        <p className="text-sm">
                          <strong>Quantity:</strong> {renderString(food.quantity)} {renderString(food.unit)}
                        </p>
                        {food.pickupLocation && (
                          <p className="text-sm">
                            <strong>Pickup:</strong> {typeof food.pickupLocation === "object" ? food.pickupLocation.address : food.pickupLocation}
                          </p>
                        )}
                        <p className="text-sm">
                          <strong>Posted On:</strong> {new Date(food.createdAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pending Requests Section for Donor */}
              {requests.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-blue-700 mb-4">📬 Pending Requests</h2>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req) => (
                      <Card key={req._id} className="shadow-md hover:shadow-lg transition border border-gray-200 rounded-2xl overflow-hidden">
                        <CardHeader>
                          <CardTitle>{req.food?.title}</CardTitle>
                          <CardDescription>Requested by: {req.requestedBy?.name}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p>Status: {req.status}</p>
                          <div className="flex gap-2">
                            {req.status === "pending" && (
                              <>
                                <Button
                                  variant="default"
                                  onClick={() => handleUpdateRequest(req._id, "approved")}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleUpdateRequest(req._id, "declined")}
                                >
                                  Decline
                                </Button>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Receiver Section */}
          {user?.role === "receiver" && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-green-700 mb-4">🥗 Available Food Donations</h2>
              {loading ? (
                <p>Loading available donations...</p>
              ) : foods.length === 0 ? (
                <p className="text-gray-500">No donations available at the moment.</p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {foods.map((food) => (
                    <Card key={food._id} className="shadow-md hover:shadow-lg transition border border-gray-200 rounded-2xl overflow-hidden">
                      {food.image && (
                        <img src={renderString(food.image)} alt={renderString(food.title)} className="w-full h-40 object-cover" />
                      )}
                      <CardHeader>
                        <CardTitle className="text-green-700">{renderString(food.title)}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-gray-700 space-y-2">
                        <p className="text-sm">
                          <strong>Quantity:</strong> {renderString(food.quantity)} {renderString(food.unit)}
                        </p>
                        {food.pickupLocation && (
                          <p className="text-sm">
                            <strong>Pickup:</strong> {typeof food.pickupLocation === "object" ? food.pickupLocation.address : food.pickupLocation}
                          </p>
                        )}
                        <p className="text-sm">
                          <strong>Posted On:</strong> {new Date(food.createdAt).toLocaleDateString()}
                        </p>
                        <Button asChild variant="secondary" className="mt-2 w-full">
                          <Link to={`/request-food/${food._id}`}>Request Food</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
