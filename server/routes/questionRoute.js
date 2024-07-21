const { Router } = require("express");
const { fetchAllQuestions, postQuestion, voteQuestion, questionForParticularTopic, getAnswersForAParticularQuestion } = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");
const questionRouter = Router();

// Route for fetching all questions
questionRouter.get("/fetch_all_questions", authMiddleware, fetchAllQuestions);

// Route for posting a question
questionRouter.post("/post_question", authMiddleware, postQuestion);

// Route for fetching questions for a particular topic
questionRouter.get("/questions_for_particular_topic/:topic", authMiddleware, questionForParticularTopic);

// Route for fetching answerss for a particular topic
questionRouter.get("/get_questions_for_particular_topic", authMiddleware, getAnswersForAParticularQuestion);

module.exports = questionRouter;