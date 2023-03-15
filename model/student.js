var mongoose = require("mongoose")
var Students = new mongoose.Schema({
    FName: {type: String},
    MName: {type: String, default:""},
    LName: {type: String, default:""},
    Mobile_No: {type: Number},
    Age: {type: String},
    Stream: {type: String, default:""},
    Email_ID: {type: String},
    Country: {type: String, default:"India"},
    Status: { type: Boolean, default: true },
},{ collection: 'Students', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Students', Students);