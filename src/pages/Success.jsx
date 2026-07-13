import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/variables.css";
import "../css/style.css";
import "../css/auth.css";
import "../css/responsive.css";


function Success() {

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const type = params.get("type");
const [darkMode, setDarkMode] = useState(false);


    let title = "";
    let message = "";


    switch(type) {

        case "register":

            title = "Registration Successful";
            message = "Your account has been created successfully.";

            break;


        case "forgot":

            title = "Email Sent";
            message = "A password reset link has been sent to your email.";

            break;


        case "verify":

            title = "Email Verified";
            message = "Your email has been verified successfully.";

            break;


        case "reset":

            title = "Password Updated";
            message = "Your password has been reset successfully.";

            break;


        default:

            title = "Success";
            message = "Your request has been completed successfully.";

    }



    // إخفاء الصفحة بعد 3 ثواني

    


useEffect(() => {

  const timer = setTimeout(() => {
    navigate("/Home");
  }, 3000);

  return () => clearTimeout(timer);

}, []);
    return (

<div className={darkMode ? "auth-container dark" : "auth-container"}>


            <div className="auth-card">


                <div className="auth-header">


                    <div className="success-icon">
                        ✓
                    </div>


                    <h1>
                        {title}
                    </h1>


                    <p>
                        {message}
                    </p>


                </div>


            </div>


        </div>

    );

}


export default Success;