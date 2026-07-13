import "../css/variables.css";
import "../css/style.css";
import "../css/auth.css";
import "../css/responsive.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ResetPassword() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
const [confirmNewPassword, setConfirmNewPassword] = useState("");

const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [strength, setStrength] = useState(0);

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

function checkPasswordStrength(password){

    let s = 0;

    if(password.length >= 8)
        s++;

    if(/[A-Z]/.test(password))
        s++;

    if(/[0-9]/.test(password))
        s++;

    if(/[^A-Za-z0-9]/.test(password))
        s++;


    setStrength(s);
}

async function resetPassword(){
    if(newPassword.length < 8){

        alert("Password must be at least 8 characters");
        return;

    }


    if(newPassword !== confirmNewPassword){

        alert("Passwords do not match");
        return;

    }

try {

    const response = await fetch(
        "https://dummyjson.com/users/1",
        {
            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                password:newPassword

            })

        }
    );


    const data = await response.json();


    console.log(data);


    if(response.ok){

        navigate("/success?type=reset");

    }else{

        alert("Reset password failed");

    }


}
catch(error){

    console.log(error);
    alert("Something went wrong");

}
    navigate("/success?type=reset");

}

  return (
    <>


<div className="auth-container">
        <button
    className="theme-toggle"
    type="button"
    onClick={() => setDarkMode(prev => !prev)}
>
    {darkMode ? "☀️" : "🌙"}
</button>
    <div className="auth-card">



        <div className="auth-header">


            <div className="auth-icon">

                

            </div>



            <h1>
                Reset Password
            </h1>


            <p>
                Create your new password
            </p>


        </div>





        <form id="resetPasswordForm">



            <div className="input-group">


                <label>
                    New Password
                </label>



                <div className="password-field">


                    <input
type={showNewPassword ? "text" : "password"}
placeholder="Enter new password"
value={newPassword}

onChange={(e)=>{
    setNewPassword(e.target.value);
    checkPasswordStrength(e.target.value);
}}
/>


                    <button
type="button"
onClick={() =>
setShowNewPassword(!showNewPassword)
}
>
{showNewPassword ? "🙈":"👁"}
</button>


                </div>


                <small 
                className="error"
                id="newPasswordError">
                </small>
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
?
""
:
strength <=2
?
"Weak Password"
:
strength ===3
?
"Medium Password"
:
"Strong Password"
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
type={showConfirmPassword ? "text" : "password"}
placeholder="Confirm password"
value={confirmNewPassword}

onChange={(e)=>
    setConfirmNewPassword(e.target.value)
}
/>


                    <button
                    type="button"
                    id="showResetConfirmPassword">

                        

                    </button>
<button
type="button"
onClick={() =>
setShowConfirmPassword(!showConfirmPassword)
}
>
{showConfirmPassword ? "🙈":"👁"}
</button>

                </div>


                <small 
                className="error"
                id="resetConfirmError">
                </small>


            </div>


<button 
className="btn-primary"
type="button"
onClick={resetPassword}
>
Reset Password
</button>


            



        </form>




        <div className="auth-footer">


          <Link to="/login">
    Back to Login
</Link>

        </div>



    </div>



</div>





<div className="success-box" id="resetSuccess">


    <div className="success-icon">

        ✓

    </div>


    <h2>
        Password Updated
    </h2>


    <p>
        Your password has been reset successfully.
    </p>


</div>


 </>
  );
}

export default ResetPassword;