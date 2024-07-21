import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./topicName.module.css";
import logo from "../../logo.svg";
import { QuestionInterface, SingleTopicInterface } from "../../interface/interfaces";
import { createdAt, validateURL } from "../../constant";

const TopicName = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<QuestionInterface[]>();
    const [topicInfo, setTopicInfo] = useState<SingleTopicInterface>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { topicName } = useParams();

    const questionsForParticularTopic = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/questions/questions_for_particular_topic/${topicName}`, {credentials:"include"});
            const data = await response.json();

            if (data.error) {
                if (data.error === "Unauthorized") {
                    navigate("/login");
                    return;
                }

                if (data.error.questions === "No Questions Found") {
                    setLoading(false);
                    setError(data.error);

                    return;
                }
            }

            setQuestions(data);
            setLoading(false);
        }
        catch (error) {
            alert("Fetch Failed");
        }
    }

    const infoAboutTopic = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/topics/get_info_about_topic?topic=${topicName}`, { credentials: "include" });
            const data = await response.json();

            if (data.error) {
                return;
            }

            setTopicInfo(data);
        }
        catch (error) {
            alert("Fetch Failed");
        }
    }

    useEffect(() => {
        questionsForParticularTopic();
        infoAboutTopic();
    }, [topicName]);

    if (loading) {
        return (
            <h2 style={ { margin: "auto", fontSize: "20px", letterSpacing: "1.2px" } }>Loading ...</h2>
        )
    }

    return (
        <div className={ style.topic_question }>

            <div className={ style.topic_heading }>
                <h2>{ topicInfo?.topicName }</h2>
                <p>{ topicInfo?.topicDescription }</p>
                <span className={ style.topic_info }>Total Questions : { topicInfo?.totalQuestions }</span>
            </div>

            {
                error && <div style={ { margin: "auto", fontSize: "25px" } }>
                    No Questions to show ...
                </div>
            }

            {
                questions?.map((question) =>
                    <div className="questions" key={ question._id }>

                        <Link to={ `/answer/${validateURL(question.title)}/${question._id}` } className="question_statements">{ question.title }</Link>
                        <div className="avtar">
                            <img src={ logo } width={ 60 } height={ 60 } alt="topic_name"></img>
                            <div className="question_info">
                                <p>Asked by { question.user.username } on <small style={ { color: "gray", fontWeight: "bold" } }> { createdAt(question.createdAt)[0] } at { createdAt(question.createdAt)[1] } </small></p>
                            </div>
                        </div>

                        <div className="question_status">
                            <p>{ question.answers.length } Answers</p>
                            <p>{ question.upvotes } Upvotes</p>
                            <p>{ question.downvotes } Downvotes</p>

                            <button className="answer" onClick={()=>navigate(`/post_answer/${validateURL(question.title)}/${question._id}`)}>Answer</button>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default TopicName;