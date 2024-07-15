const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    sessionref: {type: String},
    subject: {type: String},
    questionstatement: {type: String},
    questiontopic: {type: String},
    answered: {type: Boolean},
    studentref: {type: String},
    tutorref: {type: String},
    dateasked: { type: String },
    timeasked: { type: String },
    starttime: {type: String},
    endtime: {type: String}
});

module.exports = mongoose.model("Question", questionSchema);
