import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import { User } from "../../interface/interfaces";

const NavBar = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>();
    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const OpenMenu = () => {
        const hello = document.querySelector("#collapse");
        if (hello?.classList.contains("collapse_menu")) {
            hello?.classList.remove("collapse_menu");
        }
        else {
            hello?.classList.add("collapse_menu");
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: "DELETE",
                credentials: "include"
            });

            const data = await response.json();

            if (data.msg) {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }
        }
        catch (error) {

        }
    }

    return (
        <>
            <nav className="nav">
                <div className="left">
                    <div className="menu" onClick={ () => OpenMenu() }>
                        <div className="lines"></div>
                        <div className="lines"></div>
                        <div className="lines"></div>
                    </div>

                    <NavLink to="/" className="logo">Quona</NavLink>
                    <NavLink to={ "/askQuestion" } className={ ({ isActive }) => isActive ? 'active' : 'links' }>Ask Question</NavLink>
                    <NavLink to={ "/topics" } className={ ({ isActive }) => isActive ? 'active' : 'links' }>Topics</NavLink>
                    {
                        localStorage.getItem("user") ?
                            <NavLink to={ `/profile/${user?.username}/${user?._id}` } className={ ({ isActive }) => isActive ? 'active' : 'links' }>Profile</NavLink> :
                            ""
                    }

                </div>

                <div className="right">
                    {
                        localStorage.getItem("user") ? <button className="logout" onClick={ () => logout() }>Logout</button> : <button className="logout" onClick={ () => navigate("/login") }>Login</button>
                    }
                </div>
            </nav>

            <div id="collapse" className="collapse_menu">
                <div className="menus">
                    <a href="/ask">Ask Question</a>
                    <a href="/topics">Topics</a>
                    <a href="/profile">Profile</a>
                </div>
            </div>
        </>

    )
}

export default NavBar;

// className={"links"}