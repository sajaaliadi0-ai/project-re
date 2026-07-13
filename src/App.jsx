import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Register from "./pages/Register";
import Success from "./pages/Success";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

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
          path="/Register" 
          element={<Register />} 
        />

        {/* Forgot Password */}

        <Route 
          path="/ForgotPassword" 
          element={<ForgotPassword />} 
        />


        <Route 
          path="/ResetPassword" 
          element={<ResetPassword />} 
        />
        {/* Verify Email */}

        <Route 
          path="/VerifyEmail" 
          element={<VerifyEmail />} 
        />

  <Route 
          path="/Success" 
          element={<Success />} 
        />
<Route 
          path="/Home" 
          element={<Home />} 
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;