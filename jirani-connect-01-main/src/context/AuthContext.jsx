import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load stored auth data on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // SIGNUP FUNCTION
  const signup = async (formData) => {
    try {
      const res = await fetch("https://jirani-eats-6.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      return true; // Success
    } catch (error) {
      console.error("Signup Error:", error);
      throw new Error(error.message || "Signup failed. Try again later.");
    }
  };

  // LOGIN FUNCTION
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("https://jirani-eats-6.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid email or password");

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data.user; // <-- important for redirect in Auth.jsx
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error(
        error.message.includes("Failed to fetch")
          ? "Cannot connect to server. Make sure backend is running on port 5000."
          : error.message
      );
    }
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, signup, login, logout, updateUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
