require("dotenv").config();
const express = require("express");
const ConnectToDb = require("./db/connectToDb");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 5000;

// CORS Middlewares
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/topics", require("./routes/topicRoute"));
app.use("/api/answers", require("./routes/answerRoute"));

// Connecting to database and connecting to the server
ConnectToDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    })
})
