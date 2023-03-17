let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let cors = require("cors");
let app = express();
let port = 9090;

app.set("views", "./view");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let Students = require("./model/student");

mongoose.connect("mongodb://127.0.0.1:27017/StudentData").then(() => {

    //To show the Data in Grid form
    app.get("/index", async (req, res) => {
      let result = await Students.find({});
      res.render("index", { data: result });
    });

    //To add user
    app.post('/AddUser', async(req,res)=>{
      let Data = {
        "FName": req.body.FName,
        "MName": req.body.MName,
        "LName": req.body.LName,
        "Mobile_No": req.body.Mobile_No,
        "Age": req.body.Age,
        "Stream": req.body.Stream,
        "Email_ID": req.body.Email_ID,
        "Country": req.body.Country,
        "Status": true
      };
      let Result = await Students.create(Data)
      console.log('Data Saved Successfully')
      res.render('admin')
    })

    app.get('/new',(req,res)=>{
      res.render('admin')
    })

    //To Update user
    app.post('/UpdateUser', async(req,res)=>{
      let findQuery= {_id: req.body._id};
      let updateQuery = {
        $set: {
            FName: req.body.FName,
            MName: req.body.MName,
            LName: req.body.LName,
            Mobile_No: req.body.Mobile_No,
            Age: req.body.Age,
            Stream: req.body.Stream,
            Email_ID: req.body.Email_ID,
            Country: req.body.Country
          }
      };
      await Students.updateOne(findQuery,updateQuery)
      console.log('Data Updated Successfully')
      res.render('admin')
    })

    app.get('/Update',(req,res)=>{
      res.render('update')
    })

    //Hard delete
    app.post('/DeleteUser',async (req,res)=>{
      let query = {
        _id : req.body._id
      }
      await Students.deleteOne(query)
      res.render('delete')
      console.log('Data Deleted Successfully')
    })

    app.get('/Delete',(req,res)=>{
      res.render('delete')
    })

    //Soft Delete //Deactivate user
    app.post('/DeactivateUser',async (req,res)=>{
      let query = {  
        _id: req.body._id,
      }

      let statusQuery={
        $set:{
          Status: false
        }
      }
      await Students.findOneAndUpdate(query,statusQuery)
        console.log('User Deactivated')
        res.render('deactivate')
    })

    app.get('/Deactivate',(req,res)=>{
      res.render('deactivate')
    })
    
    //Activate user
    app.post('/ActivateUser',async (req,res)=>{
      let query = {
        _id: req.body._id,
      }
      let statusQuery={
        $set:{
          Status: true
        }
      }
      await Students.findOneAndUpdate(query,statusQuery)
      console.log('User Activated')
      res.render('activate')
    })

    app.get('/Activate',(req,res)=>{
      res.render('activate')
    })

  })
  .catch(() => {
    console.log("Error while connecting");
  });

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
