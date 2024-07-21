const { Schema, model } = require("mongoose");
const { hashPassword, emailValidator, checkPassword } = require("../utils/authFunctions");

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username must be provided"],
        unique: [true, "Username must be unique"]
    },

    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: [true, "Email must be unique"]
    },

    password: {
        type: String,
        required: [true, "Password must be provided"],
        minLength: [6, "Password must be atleast 8 characters long"]
    },

    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question"
        }
    ],

    answers: {
        type: Number,
        default: 0
    }
});

userSchema.pre("save", async function (next) {
    if (this.password && this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }

    return next();
});

userSchema.statics.validateUser = async function (email, password) {
    if (!email || !password) {
        throw new Error("Missing Fields");
    }

    const user = await this.findOne({ email: email });
    if (!user) {
        throw new Error("User does not exists");
    }

    const isCorrectPassword = await checkPassword(user.password, password);
    if (isCorrectPassword) {
        return { _id: user._id, username: user.username };
    }

    throw new Error("Invalid Credentials");
}

const User = model("User", userSchema);
module.exports = User;