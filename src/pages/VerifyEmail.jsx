import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import "../css/auth.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/variables.css";



function VerifyEmail() {


    const navigate = useNavigate();



    const [otp, setOtp] = useState(
        ["","","","","",""]
    );


    const [loading, setLoading] = useState(false);


    const [error, setError] = useState("");


    const [success, setSuccess] = useState("");



    const [timer, setTimer] = useState(30);





    // ==========================
    // Dark Mode
    // ==========================


    useEffect(()=>{


        const savedTheme =
        localStorage.getItem("theme");


        if(savedTheme === "dark"){

            document.body.classList.add(
                "dark"
            );

        }



    },[]);






    const toggleTheme = ()=>{


        const body = document.body;


        if(body.classList.contains("dark")){


            body.classList.remove(
                "dark"
            );


            localStorage.setItem(
                "theme",
                "light"
            );


        }

        else{


            body.classList.add(
                "dark"
            );


            localStorage.setItem(
                "theme",
                "dark"
            );


        }


    };







    // ==========================
    // OTP Change
    // ==========================


    const handleChange = (value,index)=>{


        if(!/^[0-9]*$/.test(value))
            return;



        const newOtp=[...otp];


        newOtp[index]=value;


        setOtp(newOtp);


    };







    // ==========================
    // Verify
    // ==========================


    const handleVerify = async()=>{


        setError("");

        setSuccess("");



        const code = otp.join("");



        if(code.length !== 6){


            setError(
                "Please enter the 6 digit code"
            );


            return;

        }





        setLoading(true);



        setTimeout(()=>{


            setLoading(false);



            setSuccess(
                "Email verified successfully"
            );



            setTimeout(()=>{


          navigate("/ResetPassword");

            },1500);



        },1500);



    };







    // ==========================
    // Resend Timer
    // ==========================


    useEffect(()=>{


        if(timer === 0)
            return;



        const interval =
        setInterval(()=>{


            setTimer(prev=>prev-1);


        },1000);



        return ()=>clearInterval(interval);



    },[timer]);






    const resendCode = ()=>{


        if(timer !==0)
            return;



        setTimer(30);


        setSuccess(
            "New code sent"
        );


    };







    return (

        <div className="auth-container">


            {/* Theme Button */}

            <button

                type="button"

                className="theme-toggle"

                onClick={toggleTheme}

            >

                <i className="fa-solid fa-moon"></i>

            </button>






            <div className="auth-card">



                <div className="logo">

                    <i className="fa-solid fa-envelope-circle-check"></i>

                </div>





                <h1>
                    Verify Your Email
                </h1>





                <p className="subtitle">

                    We sent a verification code to your email.
                    Please enter the code below.

                </p>








                <div className="otp-container">


                    {
                        otp.map((digit,index)=>(


                            <input

                                key={index}

                                type="text"

                                maxLength="1"

                                value={digit}

                                onChange={(e)=>
                                    handleChange(
                                        e.target.value,
                                        index
                                    )
                                }

                            />


                        ))
                    }


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


                    type="button"


                    className="btn-primary"


                    onClick={handleVerify}


                    disabled={loading}


                >


                    {

                        loading ?

                        <span className="spinner"></span>

                        :

                        "Verify"

                    }


                </button>







                <p className="bottom-text">


                    Didn't receive the code?



                    <button

                        type="button"

                        className="resend-btn"

                        disabled={timer !==0}

                        onClick={resendCode}

                    >

                        {

                            timer !==0

                            ?

                            `Resend Code (${timer})`

                            :

                            "Resend Code"

                        }


                    </button>



                </p>




            </div>


        </div>

    );

}



export default VerifyEmail;