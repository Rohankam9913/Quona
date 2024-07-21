import { useEffect, useState } from "react";
import style from "./profile.module.css";
import { useNavigate } from "react-router-dom";
import { ProfileInterface } from "../../interface/interfaces";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<ProfileInterface>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getCurrentUserInfo = async () => {
        try{
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/getUserInfo", {
                credentials: "include"
            });

            const data = await response.json();

            if(data.error === "Unauthorized"){
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            setLoading(false);
            setUserInfo(data);
        }
        catch(error){
            alert("Fetch Failed");
        }
    }

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(!user){
            navigate("/login");
            return;
        }
        getCurrentUserInfo();
    },[]);

    if(loading){
        return(
            <h2 style={ { margin: "auto", fontSize: "20px", letterSpacing: "1.2px" } }>Loading ...</h2>
        )
    }

    return (
        <div className={ style.profile }>
            <h2 className={ style.heading }>{userInfo?.username}'s Profile</h2>

            <h4 className={style.description}>Profile page helps you monitor all the questions and answers posted.</h4>

            <div className={ style.status }>
                <p>Number of Questions Asked: { userInfo?.questions.length }</p>
                <p>Number of Answers answered: { userInfo?.answers }</p>
            </div>

            <div className={ style.button }>
                <button onClick={ () => navigate(`/profile/your_questions`) }>Show Questions</button>
                <button onClick={ () => navigate(`/profile/your_answers`) }>Show Answers</button>
            </div>
        </div>
    )
}

export default Profile;