const { Router } = require("express");
const { postAnswer, voteAnswer, postComments } = require("../controllers/answerController");
const authMiddleware = require("../middleware/authMiddleware");
const answerRouter = Router();

// Route for posting answer
answerRouter.post("/post_answer", authMiddleware, postAnswer);

// Route for voting answer
answerRouter.put("/vote_answer", authMiddleware, voteAnswer);

module.exports = answerRouter;
