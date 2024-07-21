const { Schema, model } = require("mongoose");

const answerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    content: {
        type: String,
        required: [true, "Answer content must be provided"]
    },

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number,
        default: 0
    },

    question: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    }
}, { timestamps: true });

const Answer = model("Answer", answerSchema);
module.exports = Answer;