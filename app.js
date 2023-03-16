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
.then(()=>{
    app.get('/form',(req,res)=>{
        res.render("form")
    })

    app.post('/form-submit', async (req,res)=>{
        const data = new Students(req.body)
        let Result = await data.save();
        res.send("Data Saved Successfully, Check Database")
    })

    app.get('/index',(req,res)=>{ 
        let db;
        db.getcollection(Students).find({}).toArray((err,result)=>{
        if(err) throw err
        res.render('index',{data:result})
       })
        // res.render('index')
    })
})
.catch(()=>{
    console.log('Error while connecting');
})

app.listen(port, (err)=>{
    if (err) throw err
    console.log(`Server is running on port ${port}`);
})