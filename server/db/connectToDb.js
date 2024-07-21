const { connect, connection } = require("mongoose");

const ConnectToDb = async ()=>{
    try{
        connection.on("connected", ()=>{
            console.log("Database connected");
        })

        connection.on("error", (error)=>{
            throw new Error(error);
        })

        await connect(process.env.MONGO_URI);
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = ConnectToDb;