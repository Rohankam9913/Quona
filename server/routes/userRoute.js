const { Router } = require("express");
const { register, login, logout, fetchQuestionsForAParticularUser, fetchAnswersForAParticularUser, getUserInfo } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = Router();

// Route for login
userRouter.post("/login", login);

// Route for register
userRouter.post("/register", register);

// Route for logout
userRouter.delete("/logout", authMiddleware ,logout);

// Route for fetching questions for a particular user
userRouter.get("/fetch_questions_for_a_particular_user", authMiddleware, fetchQuestionsForAParticularUser);

// Route for fetching answers for a particular user
userRouter.get("/fetch_answers_for_a_particular_user", authMiddleware, fetchAnswersForAParticularUser);

// Route for getting information about user
userRouter.get("/getUserInfo", authMiddleware, getUserInfo);

module.exports = userRouter;