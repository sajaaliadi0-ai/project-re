import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/variables.css";
import "../css/style.css";
import "../css/auth.css";
import "../css/responsive.css";

function Login() {

  const navigate = useNavigate();

const [username, setUsername] = useState(() => {

  return localStorage.getItem("rememberedUsername") || "";

});
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

const [rememberMe, setRememberMe] = useState(() => {

  return localStorage.getItem("rememberedUsername") !== null;

});
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

const [darkMode, setDarkMode] = useState(() => {

  return localStorage.getItem("theme") === "dark";

});

  useEffect(() => {

  if (darkMode) {

    document.body.classList.add("dark");

  } else {

    document.body.classList.remove("dark");

  }

}, [darkMode]);

  // ==========================
  // Theme
  // ==========================

  const toggleTheme = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {

      document.body.classList.add("dark");

      localStorage.setItem("theme", "dark");

    } else {

      document.body.classList.remove("dark");

      localStorage.setItem("theme", "light");

    }

  };
    // ==========================
  // Login
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation

    if (username.trim() === "") {

      setError("Please enter your username.");

      return;

    }

    if (password.trim() === "") {

      setError("Please enter your password.");

      return;

    }

    if (password.length < 6) {

      setError("Password must be at least 6 characters.");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Invalid username or password."
        );

      }

      // Save User

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      // Remember Me

      if (rememberMe) {

        localStorage.setItem(
          "rememberedUsername",
          username
        );

      } else {

        localStorage.removeItem(
          "rememberedUsername"
        );

      }

      setSuccess("✅ Login Successful!");

      setTimeout(() => {

        navigate("/success");

      }, 1500);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };
    return (

    <div className="auth-container">

      {/* Theme Toggle */}

      <button
        className="theme-toggle"
        onClick={toggleTheme}
      >
        <i
          className={
            darkMode
              ? "fa-solid fa-sun"
              : "fa-solid fa-moon"
          }
        ></i>
      </button>

      {/* Login Card */}

      <div className="auth-card">

        <div className="logo">

          <i className="fa-solid fa-user-shield"></i>

        </div>

        <h1>Welcome</h1>

        <p className="subtitle">

          Sign in to your account

        </p>

        {/* Error */}

        {error && (

          <div className="error-message">

            {error}

          </div>

        )}

        {/* Success */}

        {success && (

          <div className="success-message">


            {success}

          </div>

        )}

        <form
          id="loginForm"
          onSubmit={handleSubmit}
        >

          {/* Username */}

          <div className="input-group">

            <label htmlFor="username">

              Username

            </label>

            <div className="input-box">

              <i className="fa-solid fa-user"></i>

              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* Password */}

          <div className="input-group">

            <label htmlFor="password">

              Password

            </label>

            <div className="input-box">

              <i className="fa-solid fa-lock"></i>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                <i
                  className={
                    showPassword
                      ? "fa-solid fa-eye-slash"
                      : "fa-solid fa-eye"
                  }
                ></i>

              </button>

            </div>

          </div>
                    {/* Options */}

          <div className="options">

            <label className="remember">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              Remember Me

            </label>


            <Link to="/ForgotPassword">

              Forgot Password?

            </Link>


          </div>



          {/* Login Button */}


          <button
            type="submit"
            className="btn"
            disabled={loading}
          >

            {
              loading
                ? "Loading..."
                : "Login"
            }


          </button>


        </form>



        <p className="bottom-text">


          Don't have an account?


          <Link to="/register">

            Register

          </Link>


        </p>



      </div>


    </div>

  );


}


export default Login;