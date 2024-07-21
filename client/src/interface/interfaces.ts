export interface TopicInterface {
    _id: string;
    topicName: string;
    topicDescription: string;
    totalQuestions: number;
}

export interface Authinterface {
    username: string;
    email: string;
    password: string;
    account: string;
}

export interface QuestionInterface {
    _id: string;
    title: string;
    description: string;
    topic: string;
    user: {
        _id: string,
        username: string
    };
    upvotes: number;
    downvotes: number;
    answers: string[];
    createdAt: string
}

export interface SingleTopicInterface {
    topicName: string;
    topicDescription: string;
    totalQuestions: number;
}

export interface User {
    username: string;
    _id: string;
}

export interface Answer {
    _id: string;
    content: string;
    createdAt: string;
    downvotes: number;
    upvotes: number;
    user: User;
}

export interface AnswerInterface {
    _id: string;
    title: string;
    description: string;
    topic: string;
    user: User;
    upvotes: number;
    downvotes: number;
    createdAt: string;
    answers: Answer[]
}

export interface SearchInterface {
    search: string;
    setSearch: (search: string) => void;
}

export interface AllQuestionsInterface {
    _id: string;
    title: string;
    description: string;
    topic: string;
    upvotes: number;
    downvotes: number;
    createdAt: string;
    updatedAt: string;
}

export interface AllAnswersInterface {
    _id: string;
    content: string;
    question: {
        _id: string;
        title: string;
        description: string;
        topic: string;
    }
}

export interface ProfileInterface {
    _id: string;
    answers: number;
    posts: string[];
    questions: string[];
    username: string;
}

export interface ShowInterface{
    id: string;
}