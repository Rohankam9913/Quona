const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    topic: {
        type: String,
        required: [true, "Topic is required"]
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Answer"
        }
    ],
}, { timestamps: true });

const Question = model("Question", questionSchema);
module.exports = Question;