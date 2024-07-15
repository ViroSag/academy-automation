const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    date: {type: String},
    starttime: {type: String},
    endtime: {type: String},
    tutors: {type: Array},
    students: {type: Array},
    studentslimit: {type: String},
    subject: {type: String},
    isactive: {type: Boolean}

});

module.exports = mongoose.model("Session", sessionSchema);
