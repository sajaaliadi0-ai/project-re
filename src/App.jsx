import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Register from "./pages/Register";
import Success from "./pages/Success";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/home/Home";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Page */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />


        {/* Login */}
        <Route 
          path="/login" 
          element={<Login />} 
        />


        {/* Register */}
        <Route 
          path="/register" 
          element={<Register />} 
        />


        {/* Forgot Password */}
        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />


        {/* Reset Password */}
        <Route 
          path="/reset-password" 
          element={<ResetPassword />} 
        />


        {/* Verify Email */}
        <Route 
          path="/verify-email" 
          element={<VerifyEmail />} 
        />


        {/* Success */}
        <Route 
          path="/success" 
          element={<Success />} 
        />


        {/* Home */}
        <Route 
          path="/home" 
          element={<Home />} 
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;