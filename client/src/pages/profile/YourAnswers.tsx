import { useEffect, useState } from "react";
import { AllAnswersInterface } from "../../interface/interfaces";
import style from "./profile.module.css";
import { validateURL } from "../../constant";
import { Link, useNavigate } from "react-router-dom";

const YourAnswers = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<AllAnswersInterface[]>([]);
    const [loading, setLoading] = useState(false);

    const getAllAnswers = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/fetch_answers_for_a_particular_user", {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();

            if (data.error === "Unauthorized") {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            setAnswers(data);
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
        getAllAnswers();
    },[]);

    if(loading){
        return(
            <h2 style={{margin:"auto", fontSize:"20px", letterSpacing:"1.2px"}}>Loading ...</h2>
        )
    }

    return (
        <div className={ style.your_questions }>
            <h4 style={{fontSize:"14px", color:"lightgray"}}>Number of Answers: { answers?.length>0 ? answers.length : 0 }</h4>

            <div className={ style.display }>
                {
                   answers.length > 0 && answers?.map((answer) =>
                        <div key={ answer._id } className={ style.question_container }>
                            <div className={ style.question_category }><p>Category of Question</p> <h3>{ answer.question.topic }</h3></div>
                            <Link to={ `/answer/${validateURL(answer.question.title)}/${answer.question._id}` } className={ style.question_statement_list }>{ answer.question.title }</Link>
                            <p className={style.answer_content}><span style={{color:"grey"}}>Answer</span> {answer.content}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default YourAnswers;