import { Answer } from "./interface/interfaces";

let topics = ["Programming", "Science", "Physics", "Chemistry", "Mathematics", "Anime", "Movies", "Songs", "Manga", "Psychology", "Games", "Mystery", "Arts", "Painting"];

export const filterTopics = (topic: string) => {
    let topic_list = topics.filter((topic_name) => topic_name.slice(0).toLowerCase().includes(topic.toLowerCase()));
    return topic_list;
}

export const createdAt = (dateTime: string) => {
    let date_time = new Date(dateTime);

    let day = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    let hours = date_time.getHours() < 10 ? "0" + date_time.getHours() : date_time.getHours();
    let minutes = date_time.getMinutes() < 10 ? "0" + date_time.getMinutes() : date_time.getMinutes();

    return [`${day}/${month}/${year}`, `${hours}:${minutes}`];
}

export const validateURL = (url: string) => {
    url = url.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    url = url.replace(/\s+/g, " ");
    url = url.trim();
    let str = url.split(" ");
    url = "";
    
    for (let i = 0; i < str.length; i++) {
        if (i == str.length - 1) {
            url += str[i];
            break;
        }

        url += str[i] + "-";
    }

    return url;
}

export const calculateVotes = (answer: Answer[]): number[] =>{
    let upvotes = 0, downvotes = 0;

    for(let i = 0;i < answer.length;i++){
        upvotes += answer[i].upvotes;
        downvotes += answer[i].downvotes;
    }

    return [upvotes, Math.abs(downvotes)];
}