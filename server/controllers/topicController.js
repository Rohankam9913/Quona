const Topic = require("../models/topicModel");

const addTopic = async (req, res) => {
    try {
        const { topicName, topicDescription } = req.body;
        const checkIfExists = await Topic.findOne({ topicName: topicName });
        if (checkIfExists) {
            throw new Error("Already exists");
        }

        const topic = await Topic.create({ topicName, topicDescription });
        res.status(201).json(topic);
    }
    catch (error) {
        error = topicErrorHandler(error);
        res.status(400).json({ error: error.message });
    }
}

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find({});
        if (topics.length === 0) {
            throw new Error("No Topics Found");
        }

        res.status(200).json(topics);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const infoAboutTopic = async (req, res) => {
    try {
        const { topic } = req.query;

        const singleTopic = await Topic.findOne({ topicName: topic });
        res.status(200).json(singleTopic);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { addTopic, getAllTopics, infoAboutTopic };