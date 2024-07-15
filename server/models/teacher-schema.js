const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: {type: String},
    subject: {type: String},
    scheduled: {type: String},
    teacherid: {type: String},
    qrimagepath: {type: String}
});

module.exports = mongoose.model("Teacher", teacherSchema);
