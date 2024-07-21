import "./main.css";
import logo from "../../logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createdAt, validateURL } from "../../constant";
import { QuestionInterface } from "../../interface/interfaces";

const Main = () => {
    const [questions, setQuestions] = useState<QuestionInterface[]>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const fetchAllQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/questions/fetch_all_questions", { credentials: "include" });
            const data = await response.json();

            if (data.error === "Unauthorized") {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            if(data.error){
                setError("No Questions Found");
                setLoading(false);
                return;
            }
            
            setLoading(false);
            setQuestions(data);
        }
        catch (error) {
           alert("Fetch Failed");
        }
    }

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    if (loading) {
        return (
            <h2 style={ { margin: "auto", fontSize: "20px", letterSpacing: "1.2px" } }>Loading ...</h2>
        )
    }

    if(error){
        return(
            <h2 style={ { margin: "auto", fontSize: "20px", letterSpacing: "1.2px" } }>No Questions Found ...</h2>
        )
    }

    return (
        <main className="main">

            {
                questions?.map((question) =>
                    <div className="questions" key={ question._id }>
                        <div className="question_category"><p>Category of Question</p> <h3>{ question.topic }</h3></div>

                        <Link to={ `/answer/${validateURL(question.title)}/${question._id}` } className="question_statements">{ question.title }</Link>
                        <div className="avtar">
                            <img src={ logo } width={ 60 } height={ 60 } alt="topic_name"></img>
                            <div className="question_info">
                                <p>Asked by { question.user.username } on <small style={ { color: "gray", fontWeight: "bold" } }> { createdAt(question.createdAt)[0] } at { createdAt(question.createdAt)[1] } </small></p>
                            </div>
                        </div>

                        <div className="question_status">
                            <p>{ question.answers.length } Answers</p>
                            <button className="answer" onClick={ () => navigate(`/post_answer/${validateURL(question.title)}/${question._id}`) }>Answer</button>
                        </div>
                    </div>
                )
            }
        </main>
    )
}

export default Main;