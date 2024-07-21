const { Router } = require("express");
const { addTopic, getAllTopics, infoAboutTopic } = require("../controllers/topicController");
const authMiddleware = require("../middleware/authMiddleware");
const topicRouter = Router();

// Route for adding a topic
topicRouter.post("/add_topic", authMiddleware, addTopic);

// Route for fetching all topics
topicRouter.get("/get_all_topics", authMiddleware, getAllTopics);

// Route for getting info about a particular topic
topicRouter.get("/get_info_about_topic", authMiddleware, infoAboutTopic);


module.exports = topicRouter;
