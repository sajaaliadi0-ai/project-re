import "../css/variables.css";
import "../css/style.css";
import "../css/auth.css";
import "../css/responsive.css";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


function Register() {

    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [strength, setStrength] = useState(0);
    const [agreeTerms, setAgreeTerms] = useState(false);


    // نفس نظام Login
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );


useEffect(() => {

    if (darkMode) {

        document.body.classList.add("dark");

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        document.body.classList.remove("dark");

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}, [darkMode]);



    function checkPasswordStrength(value) {

        let s = 0;


        if (value.length >= 8)
            s++;


        if (/[A-Z]/.test(value))
            s++;


        if (/[0-9]/.test(value))
            s++;


        if (/[^A-Za-z0-9]/.test(value))
            s++;


        setStrength(s);

    }





    function validateEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return pattern.test(email);

    }





async function register() {

        if (name.trim() === "") {

            alert("Name is required");
            return;

        }


        if (email.trim() === "") {

            alert("Email is required");
            return;

        }


        if (!validateEmail(email)) {

            alert("Invalid email");
            return;

        }


        if (password.length < 8) {

            alert("Password must be at least 8 characters");
            return;

        }


        if (password !== confirmPassword) {

            alert("Passwords do not match");
            return;

        }


        if (!agreeTerms) {

            alert("Please accept Terms & Conditions");
            return;

        }

try {

    const response = await fetch(
        "https://dummyjson.com/users/add",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                firstName:name,
                email:email,
                password:password

            })
        }
    );


    const data = await response.json();


    console.log(data);


    if(response.ok){

        navigate("/success?type=register");

    }else{

        alert("Registration failed");

    }


}catch(error){

    console.log(error);
    alert("Something went wrong");

}
        navigate("/success?type=register");

    }





    return (

        <div className="auth-container">


            <button

                className="theme-toggle"

                type="button"

                onClick={() => setDarkMode(!darkMode)}

            >

                {darkMode ? "☀️" : "🌙"}

            </button>





            <div className="auth-card">



                <div className="auth-header">


                    <h1>
                        Create Account
                    </h1>


                    <p>
                        Create your account to continue
                    </p>


                </div>







                <form

                    id="registerForm"

                    onSubmit={(e) => {

                        e.preventDefault();

                        register();

                    }}

                >






                    <div className="input-group">


                        <label>
                            Full Name
                        </label>


                        <input

                            type="text"

                            placeholder="Enter your name"

                            value={name}

                            onChange={(e)=>
                                setName(e.target.value)
                            }

                        />


                    </div>








                    <div className="input-group">


                        <label>
                            Email
                        </label>


                        <input

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e)=>
                                setEmail(e.target.value)
                            }

                        />


                    </div>









                    <div className="input-group">


                        <label>
                            Password
                        </label>



                        <div className="password-field">


                            <input

                                type={
                                    showPassword
                                    ? "text"
                                    : "password"
                                }

                                id="password"

                                placeholder="Enter password"

                                value={password}

                                onChange={(e)=>{

                                    setPassword(
                                        e.target.value
                                    );

                                    checkPasswordStrength(
                                        e.target.value
                                    );

                                }}

                            />



                            <button

                                type="button"

                                style={{zIndex:10}}

                                onClick={()=>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }

                            >

                                {
                                    showPassword
                                    ? "🙈"
                                    : "👁"
                                }


                            </button>



                        </div>






                        <div className="strength">


                            <div

                                className="strength-bar"

                                style={{

                                    width:

                                    strength === 0
                                    ? "0%"

                                    : strength <= 2
                                    ? "35%"

                                    : strength === 3
                                    ? "65%"

                                    : "100%"

                                }}

                            ></div>




                            <p>

                            {
                                strength === 0
                                ? ""

                                : strength <= 2
                                ? "Weak Password"

                                : strength === 3
                                ? "Medium Password"

                                : "Strong Password"
                            }

                            </p>



                        </div>



                    </div>









                    <div className="input-group">


                        <label>
                            Confirm Password
                        </label>



                        <div className="password-field">


                            <input

                                type={
                                    showConfirmPassword
                                    ? "text"
                                    : "password"
                                }

                                placeholder="Confirm password"

                                value={confirmPassword}

                                onChange={(e)=>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }

                            />



                            <button

                                type="button"

                                style={{zIndex:10}}

                                onClick={()=>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }

                            >

                            {
                                showConfirmPassword
                                ? "🙈"
                                : "👁"
                            }


                            </button>



                        </div>



                    </div>









                    <div className="terms">


                        <input

                            type="checkbox"

                            id="terms"

                            checked={agreeTerms}

                            onChange={(e)=>
                                setAgreeTerms(
                                    e.target.checked
                                )
                            }

                        />


                        <label>

                            I agree to Terms & Conditions

                        </label>


                    </div>







                    <button

                        className="btn-primary"

                        type="submit"

                    >

                        Create Account

                    </button>





                </form>







                <div className="auth-footer">


                    Already have an account?


                    <Link to="/login">

                        Login

                    </Link>


                </div>




            </div>


        </div>

    );

}


export default Register;