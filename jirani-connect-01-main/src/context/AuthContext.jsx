import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api"; // ✅ import your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load stored auth data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // ✅ Signup Function (uses axios instance)
  const signup = async (formData) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      return data; // success
    } catch (error) {
      console.error("Signup Error:", error);
      throw new Error(
        error.response?.data?.message || "Signup failed. Try again later."
      );
    }
  };

  // ✅ Login Function (uses axios instance)
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data.user; // important for redirects
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error(
        error.response?.data?.message ||
          "Login failed. Check your credentials or connection."
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

export const useAuth = () => useContext(AuthContext);
