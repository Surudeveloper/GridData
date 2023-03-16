var mongoose = require("mongoose")
var Students = new mongoose.Schema({
    FName: {type: String, required:true},
    MName: {type: String, default:""},
    LName: {type: String, default:""},
    Mobile_No: {type: Number, required:true},
    Age: {type: String, default:""},
    Stream: {type: String, default:""},
    Email_ID: {type: String, required:true},
    Country: {type: String, default:"India"},
    Status: { type: Boolean, default: true },
},{ collection: 'Students', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Students', Students);

// let StudentsTable = mongoose.model('Students', Students);
// module.exports={
//      fetchData:function(callback){
//         let StudentsData=StudentsTable.find({});
//         StudentsData.exec(function(err, data){
//             if(err) throw err;
//             return callback(data);
//         })
//      }
// }