import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Package, Inbox, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your donations and requests
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Donate Food
            </Button>
            <Button variant="outline">
              <Inbox className="mr-2 h-4 w-4" />
              Request Food
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Active Donations
                </CardTitle>
                <CardDescription>Food items you're currently sharing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground mt-2">
                  No active donations yet
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-secondary" />
                  Pending Requests
                </CardTitle>
                <CardDescription>Food requests awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">0</div>
                <p className="text-sm text-muted-foreground mt-2">
                  No pending requests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Total Impact
                </CardTitle>
                <CardDescription>Meals shared with community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">0</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Start making an impact today
                </p>
              </CardContent>
            </Card>

          </div>

          {/* Welcome Card */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Welcome to JiraniEat!</CardTitle>
              <CardDescription>
                To access full dashboard features including donations and requests, authentication is required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create an account to start sharing or requesting food in your community.
                Our authentication system will be powered by Lovable Cloud, providing secure 
                user management and data storage.
              </p>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
