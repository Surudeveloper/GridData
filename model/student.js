var mongoose = require("mongoose")
var Students = new mongoose.Schema({
    FName: {type: String, required:true},
    MName: {type: String, default:""},
    LName: {type: String, default:""},
    Mobile_No: {type: Number},
    Age: {type: String, default:""},
    Stream: {type: String, default:""},
    Email_ID: {type: String},
    Country: {type: String, default:"India"},
    Status: { type: Boolean, default: true },
},{ collection: 'Students', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Students', Students);
// const StudentModel = mongoose.model("StudentModel",Students)

// module.exports = StudentModel
