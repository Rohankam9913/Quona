const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");
const User = require("../models/userModel");
const { answerErrorHandeler } = require("../utils/answerFunctions");

const postAnswer = async (req, res) => {
    try {
        const { content, questionId } = req.body;
        const userId = req.user.id;

        if (!content || !questionId) {
            throw new Error("Missing Data");
        }

        let answer = await Answer.create({ content, user: userId, question: questionId });
        answer = await Answer.findById({ _id: answer._id }).populate("user", "username _id");
        await Question.findByIdAndUpdate({ _id: questionId }, { $push: { answers: answer } }, { new: true });
        await User.findByIdAndUpdate({ _id: userId }, { $inc: { answers: 1 } }, { new: true });
        res.status(201).json({ msg: "success" });
    }
    catch (error) {
        error = answerErrorHandeler(error);
        res.status(400).json({ error: error });
    }
}

const voteAnswer = async (req, res) => {
    try {
        const { vote, answerId } = req.body;
        if (!answerId) {
            throw new Error("Missing Data");
        }

        let answer;

        if (vote) {
            answer = await Answer.findByIdAndUpdate({ _id: answerId }, { $inc: { upvotes: 1 } }, { new: true }).select("_id upvotes");
        }
        else {
            answer = await Answer.findByIdAndUpdate({ _id: answerId }, { $inc: { downvotes: -1 } }, { new: true }).select("_id downvotes");
        }

        res.status(200).json(answer);
    }
    catch (error) {
        error = answerErrorHandeler(error);
        res.status(400).json({ error: error });
    }
}


module.exports = { postAnswer, voteAnswer };