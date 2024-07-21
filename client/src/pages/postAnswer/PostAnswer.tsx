import { useEffect, useRef, useState } from "react";
import style from "./postAnswer.module.css";
import { useNavigate, useParams } from "react-router-dom";

const PostAnswer = () => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [content, setContent] = useState("");
    const { question_name, questionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    const postAnswer = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/answers/post_answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, questionId }),
                credentials: "include"
            });

            const data = await response.json();

            if (data.error === "Unauthorized") {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            if (data.msg === "success") {
                setContent("");
                navigate(`/answer/${question_name}/${questionId}`);
                return;
            }
        }
        catch (error) {
            alert("Fetch Failed");
        }
    }

    return (
        <div className={ style.answerContainer }>
            <h2 className={ style.heading }>Write Your Answer Here</h2>

            <textarea className={ style.answer } ref={ inputRef } value={ content } onChange={ (e) => setContent(e.target.value) }></textarea>

            <button className={ style.post_answer } onClick={ () => postAnswer() }>Post Answer</button>
        </div>
    )
}

export default PostAnswer;