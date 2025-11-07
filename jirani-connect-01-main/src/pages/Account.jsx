import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Calendar, LogOut, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Account = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Local editable state
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to update profile");
      }

      const data = await res.json();
      updateUser(data);
      setSaved(true);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <h2 className="text-2xl font-semibold mb-4">You’re not logged in.</h2>
        <Button onClick={() => navigate("/auth")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="flex flex-col items-center">
              <User className="h-16 w-16 text-primary mb-2" />
              <CardTitle className="text-3xl font-bold">
                {profile.name || user.name}
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-1">My Profile</p>
            </CardHeader>

            <CardContent className="space-y-6 mt-6">
              {/* Email */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                </div>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Role:</span>
                </div>
                <span className="text-sm capitalize text-muted-foreground">
                  {user.role || "User"}
                </span>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Member Since:</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>

              {/* Editable Fields */}
              <div className="pt-6 space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Profile Details</h2>

                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="e.g. +254712345678"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    placeholder="e.g. Nairobi, Kenya"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself..."
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => {
                      logout();
                      navigate("/auth");
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>

                {saved && (
                  <p className="text-green-600 text-sm mt-2">
                    ✅ Profile updated successfully
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
