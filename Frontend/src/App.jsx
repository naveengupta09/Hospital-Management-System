import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/pages/Home";
import DoctorAdminLogin from "./Components/pages/DoctorAdminLogin";
import PatientLogin from "./Components/pages/PatientLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-admin/login" element={<DoctorAdminLogin />} />
        <Route path="/sign-in" element={<PatientLogin />} />
      </Routes>
    </div>
  );
};

export default App;
