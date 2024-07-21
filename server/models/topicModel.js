const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
    topicName: {
        type: String,
        required: true
    },

    topicDescription: {
        type: String,
        required: true
    },

    totalQuestions: {
        type: Number,
        default: 0
    }
});

const Topic = model("Topic", topicSchema);
module.exports = Topic;