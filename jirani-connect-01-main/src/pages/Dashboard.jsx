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
import { Plus, Package, Inbox, TrendingUp, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getFoods } from "../api"; // ✅ API import
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth(); // ✅ Access user + logout from context
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const foodRes = await getFoods();
        const allFoods = foodRes.data;

        // ✅ Filter data based on logged-in user
        const myDonations = allFoods.filter((item) => item.donorId === user.id);
        const myRequests = allFoods.filter((item) => item.requesterId === user.id);

        setDonations(myDonations);
        setRequests(myRequests);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const totalImpact = donations.length + requests.length;

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
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
                Manage your food donations and requests
              </p>
            </div>

            {/* Account + Logout Buttons */}
            {user && (
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline" onClick={() => navigate("/account")}>My Account</Button>
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

          {/* Actions */}
          {user && (
            <div className="flex gap-3">
              <Button asChild variant="default">
                <Link to="/donate-food">
                  <Plus className="mr-2 h-4 w-4" /> Donate Food
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/request-food">
                  <Inbox className="mr-2 h-4 w-4" /> Request Food
                </Link>
              </Button>
            </div>
          )}

          {/* Cards Section */}
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
                  {loading ? "..." : donations.length}
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
                  Food requests awaiting approval
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
