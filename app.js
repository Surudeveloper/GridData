var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();
var port = 9090;

app.set('views', './view')
app.set('view engine', 'ejs' )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const Students = require('./model/student')
mongoose.connect('mongodb://127.0.0.1:27017/StudentData')

let db;
let col_name = "Students"
app.get('/',(req,res)=>{
    db.collection(col_name).find({}).toArray((err,result)=>{
        if(err) throw err;
        res.status(200).render('index', {data:result})
    })
})
// mongoose.connect('mongodb://127.0.0.1:27017/StudentData')
// .then(()=>{
//     app.get('/index',(req,res)=>{
//         res.render(__dirname+"/view/index.ejs")
//     })
    
//     app.post('/form-submit', async (req,res)=>{
//         const data = new Students(req.body)
//         await data.save()
//         res.send("Data Saved Successfully, Check Database")
//     })
// })
// .catch(()=>{
//     console.log('Error while connecting');
// })

app.listen(port, (err)=>{
    if (err) throw err
    console.log(`Server is running on port ${port}`);
})