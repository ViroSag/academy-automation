const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {type: String},
    schoolname: {type: String},
    feepaid: {type: String},
    age: {type: String},
    studentid: {type: String},
    qrimagepath: {type: String}

});

module.exports = mongoose.model("Student", studentSchema);
