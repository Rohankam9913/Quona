const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const checkPassword = async (hashed, original) => {
    return await bcrypt.compare(original, hashed);
}

const authHandler = (error) => {
    let errors = { username: "", email: "", password: "", account: "" };

    if (error.message.includes("Missing Fields")) {
        errors.account = error.message;
    }

    if (error.message.includes("Invalid Credentials")) {
        errors.account = error.message;
    }

    if (error.message.includes("User does not exists")) {
        errors.account = error.message;
    }

    if (error.message.includes("Email is invalid")) {
        errors.email = error.message;
    }

    if(error.message.includes("No Questions found") || error.message.includes("No Answers found")){
        errors.account = error.message;
    }

    if (error.code === 11000) {
        errors.account = "Account already exists";
    }

    if (error.message.includes("User validation failed")) {
        Object.values(error.errors).forEach((error) => {
            errors[error.properties.path] = error.properties.message;
        });
    }

    return errors;
}

const emailValidator = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, {
        expiresIn: "1h",
    })
}

module.exports = { hashPassword, authHandler , emailValidator, checkPassword, generateToken };

