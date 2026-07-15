import "./home.css";
import "../../css/responsive.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
function Home() {
const {t}=useTranslation();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(

        localStorage.getItem("theme") === "dark"

    );

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState("");
    const [search, setSearch] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);

    const [section, setSection] =
        useState("dashboard");



    useEffect(() => {

        document.documentElement.setAttribute(

            "data-theme",

            darkMode ? "dark" : "light"

        );

        localStorage.setItem(

            "theme",

            darkMode ? "dark" : "light"

        );

    }, [darkMode]);



    useEffect(() => {

        setLoading(true);

        fetch(

            userId

                ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`

                : `https://jsonplaceholder.typicode.com/posts`

        )
            .then(res => res.json())
            .then(data => {

                setPosts(data);
                setLoading(false);

            });

    }, [userId]);



    const filteredPosts = posts.filter(post =>

        post.title
            .toLowerCase()
            .includes(search.toLowerCase())

    );



    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    }

function changeLanguage(){

    const newLang =
    i18n.language === "en"
    ? "ar"
    : "en";


    i18n.changeLanguage(newLang);

    localStorage.setItem(
        "lang",
        newLang
    );


    document.documentElement.dir =
    newLang === "ar"
    ? "rtl"
    : "ltr";

}

    return (

        <div className="home-page">

            <header className="dashboard-header">

                <div className="header-left">

                    <button
                        className="burger"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >
                        ☰
                    </button>

                    <h2 className="logos">

📋 {t("dashboard")}

                    </h2>

                </div>



                <div className="header-actions">

                    <button
                        className="theme-btn"
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                    >

                        {
                            darkMode
                                ? "☀ Light"
                                : "🌙 Dark"
                        }

                    </button>

<button
className="language-btn"
onClick={changeLanguage}
>

🌐 {t("language")}

</button>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >

{t("logout")}
                    </button>

                </div>

            </header>



            <div className="dashboard">

                <aside
                    className={
                        menuOpen
                            ? "sidebar active"
                            : "sidebar"
                    }
                >

                    <button
                        onClick={() => {

                            setSection("dashboard");
                            setMenuOpen(false);

                        }}
                    >
🏠 {t("dashboard")}                    </button>



                    <button
                        onClick={() => {

                            setSection("posts");
                            setMenuOpen(false);

                        }}
                    >
📝 {t("posts")}                    </button>



                    <button
                        onClick={() => {

                            setSection("favorites");
                            setMenuOpen(false);

                        }}
                    >
❤️ {t("favorites")}                    </button>



                    <button
                        onClick={() => {

                            setSection("analytics");
                            setMenuOpen(false);

                        }}
                    >
📊 {t("analytics")}                    </button>

                </aside>



                <main className="content">

                    <div className="top-bar">

                        <input
                            type="text"
placeholder={t("search")}                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />



                        <select
                            value={userId}
                            onChange={(e) =>
                                setUserId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Users
                            </option>

                            {

                                [1,2,3,4,5,6,7,8,9,10]

                                    .map(id => (

                                        <option
                                            key={id}
                                            value={id}
                                        >

                                            User {id}

                                        </option>

                                    ))

                            }

                        </select>

                    </div>



                    {

                        section === "dashboard" && (

                            <div className="stats">

                                <div className="stat-card">

                                    <h1>
                                        {posts.length}
                                    </h1>

                                    <p>
                                        Total Posts
                                    </p>

                                </div>



                                <div className="stat-card">

                                    <h1>

                                        {

                                            userId

                                                ? userId

                                                : "All"

                                        }

                                    </h1>

                                    <p>
                                        Selected User
                                    </p>

                                </div>



                                <div className="stat-card">

                                    <h1>

                                        {

                                            filteredPosts.length

                                        }

                                    </h1>

                                    <p>
                                        Results
                                    </p>

                                </div>

                            </div>

                        )

                    }



                    {

                        section === "posts" && (

                            <div className="cards">

                                {

                                    loading

                                        ?

                                        <h2>
{t("loading")}                                        </h2>

                                        :

                                        filteredPosts.map(post => (

                                            <div
                                                className="post-card"
                                                key={post.id}
                                            >

                                                <span>

                                                    User {post.userId}

                                                </span>

                                                <h3>

                                                    {post.title}

                                                </h3>

                                                <p>

                                                    {post.body}

                                                </p>

                                            </div>

                                        ))

                                }

                            </div>

                        )

                    }



                    {

                        section === "favorites" && (

                            <div className="empty">

                                ❤️ No Favorites Yet

                            </div>

                        )

                    }



                    {

                        section === "analytics" && (

                            <div className="stats">

                                <div className="stat-card">

                                    <h1>
                                        {posts.length}
                                    </h1>

                                    <p>
                                        Total Posts
                                    </p>

                                </div>



                                <div className="stat-card">

                                    <h1>

                                        {

                                            filteredPosts.length

                                        }

                                    </h1>

                                    <p>
                                        Filtered Posts
                                    </p>

                                </div>

                            </div>

                        )

                    }

                </main>

            </div>

        </div>

    );

}

export default Home;