import "./answer.css";
import logo from "../../logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnswerInterface } from "../../interface/interfaces";
import { calculateVotes, createdAt } from "../../constant";

const Answer = () => {
    const { question_name, questionId } = useParams();
    const [allAnswers, setAllAnswers] = useState<AnswerInterface>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAnswers = async () => {
        try {

            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/questions/get_questions_for_particular_topic?questionId=${questionId}`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data.error === "Unauthoirized") {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }
            setAllAnswers(data);
            setLoading(false);
        }
        catch (error) {

        }
    }

    const voteAnswers = async (vote: boolean, answerId: string) => {
        try {
            const response = await fetch("http://localhost:5000/api/answers/vote_answer", {
                method: "PUT",
                body: JSON.stringify({ vote: vote, answerId: answerId }),
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            });

            const data = await response.json();

            if (allAnswers) {
                let updatedAnswers = { ...allAnswers };
                if (updatedAnswers.answers !== undefined) {
                    for (let i = 0; i < updatedAnswers.answers.length; i++) {
                        if (updatedAnswers.answers[i]._id === data._id && vote === true) {
                            updatedAnswers.answers[i].upvotes = data.upvotes;
                        }
                        else if (updatedAnswers.answers[i]._id === data._id && vote === false) {
                            updatedAnswers.answers[i].downvotes = data.downvotes;
                        }
                    }
                }
                setAllAnswers(updatedAnswers);
            }
        }
        catch (error) {

        }
    }


    useEffect(() => {
        fetchAnswers();
    }, [questionId]);

    if (loading) {
        return (
            <h2 style={ { margin: "auto", fontSize: "20px", letterSpacing: "1.2px" } }>Loading ...</h2>
        )
    }

    return (
        <div className="answers">
            {
                allAnswers && allAnswers.answers ?
                    <>
                        <div className="question_statement">
                            <div className="question_status">
                                <p>{ allAnswers.answers.length } Answers</p>
                                <p>{ calculateVotes(allAnswers.answers)[0] } Upvotes</p>
                                <p>{ calculateVotes(allAnswers.answers)[1] } Downvotes</p>
                            </div>

                            <p className="asker" style={ { color: "#61DBFB" } }>Asked by <strong>{ allAnswers.user.username }</strong> on { createdAt(allAnswers.createdAt)[0] } at { createdAt(allAnswers.createdAt)[1] }</p>


                            <h3 style={ { fontSize: "19px" } }>{ allAnswers?.title }</h3>
                            <h4 style={ { fontSize: "16px" } }>{ allAnswers?.description }</h4>

                            <div className="answer_social">
                                <button onClick={()=> navigate(`/post_answer/${allAnswers.title}/${allAnswers._id}`)}>Answer</button>
                            </div>
                        </div>

                        <div className="answer_container">

                            {
                                allAnswers?.answers.map((answer) =>

                                    <div className="answer" key={ answer._id }>
                                        <div className="avtar">
                                            <img src={ logo } alt="user" width={ 70 } height={ 70 } />
                                            <div className="user_info">
                                                <h3>{ answer.user.username }</h3>
                                                <small style={ { letterSpacing: "1.2px", color: "ghostwhite" } }>Answered on { createdAt(answer.createdAt)[0] } at { createdAt(answer.createdAt)[1] }</small>
                                            </div>
                                        </div>

                                        <div className="answer_content">
                                            <p>{ answer.content }</p>

                                            <div className="answer_social">
                                                <button onClick={ () => voteAnswers(true, answer._id) }>{ answer.upvotes } Upvotes</button>
                                                <button onClick={ () => voteAnswers(false, answer._id) }>{ Math.abs(answer.downvotes) } Downvotes</button>
                                    
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                    </>
                    :
                    ""
            }

        </div>
    )
}

export default Answer;