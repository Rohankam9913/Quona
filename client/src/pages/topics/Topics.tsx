import { Link, useNavigate } from "react-router-dom";
import "./topics.css";
import { useEffect, useState } from "react";
import { TopicInterface } from "../../interface/interfaces";

const Topics = () => {
    const [allTopics, setAllTopics] = useState<TopicInterface[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const fetchAllTopics = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/topics/get_all_topics", { credentials: "include" });
            const data = await response.json();

            if(data.error === "Unauthorized"){
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            if (data.error) {
                throw new Error(data.error);
            }

            setAllTopics(data);
            setLoading(false);
        }
        catch (error) {
            alert("Fetch Failed");
        }
    }

    const filterTopics = (topic: TopicInterface[] | null) => {
        if(topic === null){
            return allTopics;
        }

        return allTopics?.filter((allTopic) => allTopic.topicName.toLowerCase().includes(search.toLowerCase()));
    }

    useEffect(() => {
        fetchAllTopics();
    }, []);

    if(loading){
        return(
            <h2 style={{margin:"auto", fontSize:"20px", letterSpacing:"1.2px"}}>Loading ...</h2>
        )
    }

    return (
        <div className="topics">
            <h2 className="heading">Discover various topics accross the globe</h2>

            <input type="text" placeholder="search for topics" className="input" value={search} onChange={(e)=>setSearch(e.target.value)}/>

            <div className="card_container">
                {
                    filterTopics(allTopics)?.map((topic =>
                        <div className="card" key={topic._id}>
                            <>
                                <h4><Link to={ `/topics/${topic.topicName}` }>{ topic.topicName }</Link></h4>
                                <p>{ topic.topicDescription }</p>
                            </>
                            <>
                                <small>{ topic.totalQuestions } questions</small>
                            </>
                        </div>
                        )
                    )
                }
            </div>

        </div>
    )
}

export default Topics;