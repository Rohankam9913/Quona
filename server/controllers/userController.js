const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");
const { emailValidator, generateToken, authHandler } = require("../utils/authFunctions");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.validateUser(email, password);

        const accessToken = generateToken(user);
        res.cookie("access_token", accessToken, {
            expire: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.status(200).json(user);
    }
    catch (error) {
        error = authHandler(error);
        res.status(400).json({ error: error });
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (email && !emailValidator(email)) {
            throw new Error("Email is invalid");
        }
        let user = await User.create({ username, email, password });
        user = await User.findById({ _id: user._id }).select("-username _id");
        res.status(201).json(user);
    }
    catch (error) {
        error = authHandler(error);
        res.status(400).json({ error: error });
    }
}

const logout = (req, res) => {
    try {
        const accessToken = req.cookies.access_token;
        if (accessToken) {
            res.clearCookie("access_token");
        }

        res.status(200).json({ msg: "success" });
    }
    catch (error) {
        error = authHandler(error);
        res.status(400).json({ error: error });
    }
}

const fetchQuestionsForAParticularUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const allQuestions = await Question.find({ user: userId }).select("-user -answers").sort({"createdAt":-1});
        if (allQuestions.length > 0) {
            return res.status(200).json(allQuestions);
        }

        throw new Error("No Questions found");
    }
    catch (error) {
        error = authHandler(error);
        res.status(400).json({ error: error });
    }
}

const fetchAnswersForAParticularUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const allAnswers = await Answer.find({ user: userId }).populate("question", "title description topic").select("-user -upvotes -downvotes -comments").sort({"createdAt":-1});
        if (allAnswers.length > 0) {
            return res.status(200).json(allAnswers);
        }

        throw new Error("No Answers found");
    }
    catch (error) {
        error = authHandler(error);
        res.status(400).json({ error: error });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const userInfo = await User.findById({ _id: req.user.id }).select("-password -email");
        res.status(200).json(userInfo);
    }
    catch (error) {
        error = authHandler(error);
        res.status(400).json({ error: error });
    }
}

module.exports = { login, register, logout, fetchQuestionsForAParticularUser, fetchAnswersForAParticularUser, getUserInfo };