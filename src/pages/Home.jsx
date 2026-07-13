import "../css/home.css";
import "../css/responsive.css";

import { useState, useEffect } from "react";

function Home() {


    const [darkMode,setDarkMode] = useState(false);
    useEffect(()=>{

    document.documentElement.setAttribute(
        "data-theme",
        darkMode ? "dark" : "light"
    );

},[darkMode]);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

const [posts,setPosts] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

    fetch("https://dummyjson.com/products")

    .then(res=>res.json())

    .then(data=>{

        setPosts(data.products);
        setLoading(false);

    })

},[]);
    function subscribe(e){

        e.preventDefault();


        if(name.trim()===""){

            alert("Please enter your name");
            return;

        }


        if(!validateEmail(email)){

            alert("Please enter valid email");
            return;

        }


        alert("Subscribed Successfully 🎉");


        setName("");
        setEmail("");

    }




    function validateEmail(email){

        const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return pattern.test(email);

    }




return (

<div className="home-page">


<div className={darkMode ? "dark" : ""}>


<header>


<div className="home-logo">


<div className="logo-icon">
🌾
</div>


<div className="logo-text">

<h2>
Sweet Crumbs
</h2>

<span>
BAKERY
</span>


</div>


</div>




<nav className="navbar">

<ul className="nav-links">


<li>
<a href="#home">
Home
</a>
</li>


<li>
<a href="#menu">
Menu
</a>
</li>


<li>
<a href="#about">
About Us
</a>
</li>


<li>
<a href="#gallery">
Gallery
</a>
</li>


</ul>

</nav>




<button

className="theme-toggle"

onClick={()=>setDarkMode(!darkMode)}

>

{darkMode ? "☀️ Light" : "🌙 Dark"}

</button>




<div className="menu-btn">

<div></div>

</div>


</header>





<section 
className="hero"
id="home"
>


<div className="overlay">


<div className="hero-content">


<h1>

Freshly Baked

<br/>

Happiness ♡

</h1>



<h3>

Made with love, every day.

</h3>



<p>

At Sweet Crumbs Bakery, we believe that the
best moments in life are made sweeter with
freshly baked treats.

</p>



<a 
href="#menu"
className="hero-btn"
>

Discover Our Menu →

</a>



</div>


</div>


</section>
<section 
className="favorites"
id="menu"
>


<h2>
Our Favorites
</h2>



<div className="cards">


{
loading ?

<h3>Loading...</h3>


:

posts.slice(0,4).map(post=>(


<div className="card" key={post.id}>


<img
src={
    post.id % 4 === 0
    ? "/img/corissant.jpg"
    : post.id % 4 === 1
    ? "/img/cake.jpg"
    : post.id % 4 === 2
    ? "/img/bread.jpg"
    : "/img/muffin.jpg"
}
alt="Bakery"
/>


<div className="card-body">


<h3>
{post.title}
</h3>


<p>
{post.body}
</p>


<span>
${post.id}.00
</span>


</div>


</div>


))


}


</div>
</section>







<section className="features">



<div className="feature">


<i className="fa-solid fa-wheat-awn"></i>


<h3>
Quality Ingredients
</h3>


<p>

We use the finest
ingredients for the best flavor.

</p>


</div>





<div className="feature">


<i className="fa-solid fa-utensils"></i>


<h3>

Made Fresh Daily

</h3>


<p>

Everything is baked
fresh every morning.

</p>


</div>






<div className="feature">


<i className="fa-regular fa-heart"></i>


<h3>

Made with Love

</h3>


<p>

Baked with passion
and love in every bite.

</p>


</div>






<div className="feature">


<i className="fa-solid fa-mug-hot"></i>


<h3>

Cozy Atmosphere

</h3>


<p>

Relax,
enjoy,
and feel at home.

</p>


</div>




<div className="feature-image">


<img
src="/img/flor1.png"
alt="Flour"
/>


</div>



</section>
<section 
className="join"
id="gallery"
>


<div className="join-image">


<img
src="/img/Coffee.png"
alt="Coffee"
/>


</div>




<div className="join-content">


<h2>
Join Our Bakery Club
</h2>



<p>

Subscribe to get updates on new treats,
special offers,
and exclusive promotions.

</p>





<form 
onSubmit={subscribe}
>



<input

type="text"

placeholder="First name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>




<input

type="email"

placeholder="Email address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>




<button type="submit">

Subscribe

</button>




</form>



</div>



</section>







<footer id="about">


<div className="footer-grid">





<div className="footer-logo">


<h2>

Sweet Crumbs

</h2>


<span>

BAKERY

</span>


</div>







<div>


<i className="fa-solid fa-location-dot"></i>


<p>

123 Baker Street

<br/>

Sweet City, SC 12345

</p>


</div>







<div>


<i className="fa-solid fa-phone"></i>


<p>

(555) 123-4567

</p>


</div>







<div>


<i className="fa-regular fa-clock"></i>


<p>

Mon-Sun

<br/>

7:00 AM - 7:00 PM

</p>


</div>







<div className="social">


<a href="#">

<i className="fa-brands fa-facebook-f"></i>

</a>



<a href="#">

<i className="fa-brands fa-instagram"></i>

</a>



<a href="#">

<i className="fa-brands fa-tiktok"></i>

</a>



</div>





</div>





<p className="copy">

©2024 Sweet Crumbs Bakery.
All rights reserved.

</p>



</footer>



</div>
</div>

);

}


export default Home;