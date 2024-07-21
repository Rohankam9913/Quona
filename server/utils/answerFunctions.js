const answerErrorHandeler = (error) => {
    let errors = { content: "", answers: ""};

    console.log(error.message);

    if(error.message.includes("Missing Data")){
        errors.answers = error.message;
    }

    if (error.message.includes("Answer validation failed")) {
        Object.values(error.errors).forEach((error) => {
            errors[error.properties.path] = error.properties.message;
        });
    }

    return errors;
}

module.exports = { answerErrorHandeler }