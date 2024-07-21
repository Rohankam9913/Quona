import { useEffect, useState } from "react";
import { AllQuestionsInterface } from "../../interface/interfaces";
import style from "./profile.module.css";
import { validateURL } from "../../constant";
import { Link, useNavigate } from "react-router-dom";

const YourQuestions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<AllQuestionsInterface[]>([]);
    const [loading, setLoading] = useState(false);

    const getAllQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/fetch_questions_for_a_particular_user", {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();

            if (data.error === "Unauthorized") {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            setQuestions(data);
            setLoading(false);
        }
        catch (error) {
            alert("Fetch Failed");
        }
    }

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user === null){
            navigate("/login");
            return;
        }
        getAllQuestions();
    },[]);

    if(loading){
        return(
            <h2 style={{margin:"auto", fontSize:"20px", letterSpacing:"1.2px"}}>Loading ...</h2>
        )
    }

    return (
        <div className={ style.your_questions }>
            <h4 style={{fontSize:"14px", color:"lightgray"}}>Number of questions: {questions?.length > 0 ? questions.length : 0}</h4>

            <div className={ style.display }>
                {
                    questions.length > 0 && questions?.map((question) =>
                        <div key={ question._id } className={ style.question_container }>
                            <div className={ style.question_category }><p>Category of Question</p> <h3>{ question.topic }</h3></div>
                            <Link to={ `/answer/${validateURL(question.title)}/${question._id}` } className={ style.question_statement_list }>{ question.title }</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default YourQuestions;