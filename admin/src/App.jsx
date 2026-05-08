import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Appointments from "./pages/Appointments";
import ListService from "./components/ListServicePage";

function RequireAuth({ children }) {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  if (!clerkEnabled) return children;
  // Without Clerk key we allow navigation so local development is not blocked.
  return children;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />

      <Route
        path="/h"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboardpage"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/add"
        element={
          <RequireAuth>
            <Add />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Hero />} />
      <Route
        path="/appointments"
        element={
          <RequireAuth>
            <Appointments />
          </RequireAuth>
        }
      />
      <Route
        path="/service-dashboard"
        element={
          <RequireAuth>
            <SerDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/add-service"
        element={
          <RequireAuth>
            <AddSer />
          </RequireAuth>
        }/>
        <Route path="/list-service" element={
          <RequireAuth>
            <ListService />
          </RequireAuth>
        }/>
        <Route path="/service-appointments" element={<RequireAuth>
          <ServiceAppointmentsPage />
          </RequireAuth>
        }
        />
    </Routes>
  );
};

export default App;