var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var port = 9090;

app.set("views", "./view");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let StudentsData = [
  {
    _id: "6412cc481c44381cc6069bff",
    FName: "Suresh",
    MName: "Kumar",
    LName: "Chauhan",
    Mobile_No: 8102356222.0,
    Age: "28",
    Stream: "Engg",
    Email_ID: "suresh.k@finbot.in",
    Country: "India",
    Status: true,
  },
  {
    _id: "6412cc821c44381cc6069c01",
    FName: "Aakash",
    MName: "Kumar",
    LName: "Sahu",
    Mobile_No: 8104352728.0,
    Age: "30",
    Stream: "Science",
    Email_ID: "aakash.k@finbot.in",
    Country: "India",
    Status: true,
  },
  {
    _id: "6412ccae1c44381cc6069c03",
    FName: "Sumit",
    MName: "",
    LName: "Kumar",
    Mobile_No: 8102353425.0,
    Age: "29",
    Stream: "Engg",
    Email_ID: "sumit.k@finbot.in",
    Country: "India",
    Status: true,
  },
  {
    _id: "6412cce21c44381cc6069c05",
    FName: "Manoj",
    MName: "Kumar",
    LName: "Mahato",
    Mobile_No: 8102277722.0,
    Age: "29",
    Stream: "Science",
    Email_ID: "manoj.k@finbot.in",
    Country: "Japan",
    Status: true,
  },
  {
    _id: "6412cd271c44381cc6069c07",
    FName: "Kaushal",
    MName: "",
    LName: "Kishore",
    Mobile_No: 8102353425.0,
    Age: "30",
    Stream: "Biology",
    Email_ID: "kaushal.k@finbot.in",
    Country: "USA",
    Status: true,
  },
  {
    _id: "6413509147c2da561e5d8ab0",
    "FName" : "Asim",
    "MName" : "Kumar",
    "LName" : "Lakra",
    "Mobile_No" : 54782764860.0,
    "Age" : "30",
    "Stream" : "Metallurgy",
    "Email_ID" : "asim.spy@g.com",
    "Country" : "Australia",
    "Status" : true
  }
];

const Students = require("./model/student");
mongoose.connect("mongodb://127.0.0.1:27017/StudentData").then(() => {
  app.get("/form", (req, res) => {
    res.render("form");
  });

  app.post("/form-submit", async (req, res) => {
    const data = new Students(req.body);
    let Result = await data.save();
    res.send("Data Saved Successfully, Check Database");
  });

  app.get("/arrayData", (req, res) => {
    res.render("index", { data: StudentsData });
  });

  app.get('/index', async (req, res) => {
    let result = await Students.find();
    console.log(result)
    res.render('index', { data: result })
  });

})
  .catch(() => {
    console.log("Error while connecting");
  });

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});