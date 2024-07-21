import { useNavigate } from "react-router-dom";
import { filterTopics } from "../../constant";
import "./question.css";
import { useEffect, useRef, useState } from "react";

const Question = () => {
    const [searchTopic, setSearchTopic] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("");

    const topicRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user === null){
            navigate("/login");
            return;
        }

        inputRef.current?.focus();
    }, []);

    const postQuestion = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/questions/post_question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, topic }),
                credentials: "include"
            });

            const data = await response.json();

            if (data.error === "Unauthorized") {
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            if (data.msg) {
                navigate("/");
                return;
            }
        }
        catch (error) {
            alert("Fetch Failed");
        }
    }

    const selectTopic = (topic: string) => {
        setTopic(topic);
        setSearchTopic("");
        if (topicRef.current) {
            topicRef.current.disabled = true;
        }
    }

    const cancelTag = () => {
        setTopic("");
        if (topicRef.current) {
            topicRef.current.disabled = false;
        }
    }

    return (
        <div className="question">
            <h2 className="title">Post a Question</h2>

            <label htmlFor="Question_title" className="label">Question title <small style={ { color: "red" } }>*</small></label>
            <input type="text" placeholder="write your question here" id="Question_title" className="input_category" ref={ inputRef } value={ title } onChange={ (e) => setTitle(e.target.value) } />

            <label htmlFor="Question_description" className="label">Question Description <small style={ { color: "red" } }>*</small></label>
            <textarea id="Question_description" className="textarea" placeholder="write description about the question" value={ description } onChange={ (e) => setDescription(e.target.value) } />

            <label htmlFor="Question_topic" className="label">Select a category <small>(select only one)</small> <small style={ { color: "red" } }>*</small></label>
            <input type="text" className="input_category" placeholder="search for category" value={ searchTopic } onChange={ (e) => setSearchTopic(e.target.value) } ref={ topicRef } />

            <div className="cateogry">
                { topic.length > 0 ? <span className="tag" onClick={ () => { cancelTag() } }>{ topic } ❌</span> : "" }
                {
                    searchTopic.length ?
                        filterTopics(searchTopic).map((topic, ind) =>
                            <div className="topic_names" key={ ind } onClick={ () => selectTopic(topic) }>
                                { topic }
                            </div>
                        )
                        : ""
                }
            </div>

            <button className="post" onClick={ () => postQuestion() }>Post Question</button>
        </div>
    )
}

export default Question;