/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSelection from "./components/ProfileSelection";
import Home from "./components/Home";
import StripeCheckout from "./components/StripeCheckout";



const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Simulación del rol. Reemplaza esta lógica con la consulta a tu base de datos o claims reales.
      if (currentUser?.email === "admin@example.com") setRole("admin");
      else setRole("user");
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profiles" element={<ProfileSelection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home" element={<><Home /><StripeCheckout /></>} />


        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role={role} requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
