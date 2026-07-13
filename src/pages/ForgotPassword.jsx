import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/variables.css";
import "../css/auth.css";
import "../css/style.css";
import "../css/responsive.css";


function ForgotPassword() {


    const navigate = useNavigate();


    // States

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");



    // ==========================
    // Dark Mode
    // ==========================

    useEffect(()=>{

    const savedTheme = localStorage.getItem("theme");


    if(savedTheme === "dark"){

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

    }
    else{

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

    }


},[]);
const toggleTheme = () => {


    const body = document.body;


    if(body.classList.contains("dark")){


        body.classList.remove("dark");


        localStorage.setItem(
            "theme",
            "light"
        );


    }
    else{


        body.classList.add("dark");


        localStorage.setItem(
            "theme",
            "dark"
        );


    }


};
    // ==========================
    // Submit
    // ==========================

const validateEmail = (email)=>{

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);

};
    const handleSubmit = async(e)=>{


        e.preventDefault();



        setError("");

        setSuccess("");




        // Validation


        if(email.trim()===""){


            setError(
                "Please enter your email"
            );


            return;

        }



        if(!validateEmail(email)){


            setError(
                "Please enter a valid email"
            );


            return;

        }





        setLoading(true);


try {

    const response = await fetch(
        "https://dummyjson.com/users"
    );

    const data = await response.json();

    const user = data.users.find(
        (user) =>
            user.email.toLowerCase() === email.toLowerCase()
    );

    if (user) {

        console.log("User Found:", user);

        setSuccess("Email verified successfully");

        setTimeout(() => {
            navigate("/VerifyEmail");
        }, 1500);

    } else {

        setError("Email not found");

    }

} catch (error) {

    console.log(error);

    setError("Server error. Try again later");

} finally {

    setLoading(false);
}
};


    return (


        <div className="auth-container">



            {/* Theme Button */}

      <button

    type="button"

    className="theme-toggle"

    id="themeToggle"

    onClick={toggleTheme}

    style={{
        zIndex: 9999
    }}

>

    <i className="fa-solid fa-moon"></i>

</button>


            <div className="auth-card">





                <div className="logo">

                    <i className="fa-solid fa-key"></i>

                </div>





                <h1>
                    Forgot Password?
                </h1>





                <p className="subtitle">

                    Enter your email address and we'll send you a link to reset your password.

                </p>








                <form onSubmit={handleSubmit}>


                    <div className="input-group">


                        <label htmlFor="email">

                            Email Address

                        </label>




                        <div className="input-box">


                            <i className="fa-solid fa-envelope"></i>




                            <input


                                type="email"


                                id="email"


                                placeholder="Enter your email"


                                value={email}


                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }


                            />



                        </div>


                    </div>







                    {
                        error &&

                        <p className="error-message">

                            {error}

                        </p>

                    }






                    {
                        success &&

                        <p className="success-message">

                            {success}

                        </p>

                    }







                    <button


                        type="submit"


                        className="auth-btn"


                        disabled={loading}


                    >



                        {

                            loading ?


                            <span className="spinner"></span>


                            :


                            "Send Reset Link"


                        }



                    </button>





                </form>









                <p className="bottom-text">


                    Remember your password?


                    <Link to="/login">

                        Back to Login

                    </Link>


                </p>






            </div>





        </div>


    );


}



export default ForgotPassword;
