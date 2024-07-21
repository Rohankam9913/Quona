const Question = require("../models/questionModel");
const Topic = require("../models/topicModel");
const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const { questionErrorHandler } = require("../utils/questionFunctions");

const fetchAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({}).populate("user", "_id username").sort({"createdAt": -1})
        if (questions.length === 0) {
            throw new Error("No Questions Found");
        }

        res.status(200).json(questions);
    }
    catch (error) {
        error = questionErrorHandler(error);
        res.status(400).json({ error: error });
    }
}

const postQuestion = async (req, res) => {
    try {
        const { title, description, topic } = req.body;
        const userId = req.user.id;
        let question = await Question.create({ title, description, topic, user: userId });
        question = await Question.findById({ _id: question._id }).populate("user", "username _id");
        await User.findByIdAndUpdate({ _id: userId }, { $push: { questions: question } }, { new: true });
        await Topic.findOneAndUpdate({ topicName: topic }, { $inc: { totalQuestions: 1 } }, { new: true });
        res.status(201).json({msg: "success"});
    }
    catch (error) {
        error = questionErrorHandler(error);
        res.status(400).json({ error: error });
    }
}

const questionForParticularTopic = async (req, res) => {
    try {
        const { topic } = req.params;
        if (!topic) {
            throw new Error("Missing Data");
        }

        const allQuestions = await Question.find({ topic: topic }).populate("user", "username _id").sort({"createdAt":-1});
        if (allQuestions.length === 0) {
            throw new Error("No Questions Found");
        }

        res.status(200).json(allQuestions);
    }
    catch (error) {
        error = questionErrorHandler(error);
        res.status(400).json({ error: error });
    }
}

const getAnswersForAParticularQuestion = async (req, res) => {
    try {
        const { questionId } = req.query;
        let getAnswers = await Question.findById({ _id: questionId }).populate("user", "username _id").populate("answers").sort({"createdAt": -1});
        getAnswers = await Answer.populate(getAnswers, {
            path: "answers.user",
            select: "username _id"
        })

        getAnswers = await Answer.populate(getAnswers, {
            path: "answers.comments",
        })

        getAnswers = await Answer.populate(getAnswers, {
            path: "answers.comments.user",
            select: "_id username"
        })

        

        if (getAnswers.length === 0) {
            throw new Error("No Questions Found");
        }

        res.status(200).json(getAnswers);
    }
    catch (error) {
        error = questionErrorHandler(error);
        res.status(400).json({ error: error });
    }
}

module.exports = { fetchAllQuestions, postQuestion, questionForParticularTopic, getAnswersForAParticularQuestion };