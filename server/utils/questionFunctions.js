const questionErrorHandler = (error) => {
    let errors = { title: "", description: "", topic: "", questions: ""};

    console.log(error.message);

    if(error.message.includes("No Questions Found") || error.message.includes("Missing Data")){
        errors.questions = error.message;
    }
    
    if (error.message.includes("Question validation failed")) {
        Object.values(error.errors).forEach((error) => {
            errors[error.properties.path] = error.properties.message;
        });
    }

    return errors;
}


module.exports = { questionErrorHandler};