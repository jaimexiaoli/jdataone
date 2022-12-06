//imports-----------------------------------------------------------------------
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var nodemailer = require("nodemailer");
const mongoose = require("mongoose");
//Statistic files---------------------------------------------------------------
app.use(express.static("public"));
app.use("/css",express.static(__dirname + "public/css"));
app.use("/img",express.static(__dirname + "public/img"));
app.use("/projects",express.static(__dirname + "public/projects"));
// set Views--------------------------------------------------------------------
app.set("views","./views");
app.set("view engine","ejs");
//--------------connect mongoose--------------------------
mongoose.connect("mongodb+srv://jaimepedro:34X@jaimep@cluster0.ilgea.mongodb.net/MyBusinessDB", {useUnifiedTopology: true, useNewUrlParser:true});
//---------------Schema-------------------------------------------------------
const datosSchema = {
  create:{type:Date,default:Date.now},
  name: String,
  email:String,
  subject:String,
  message:String,
  NumberStar: Number,
  nameReport: String
}

//-----------------Model------------------------------------------------------
const Data = mongoose.model("Data",datosSchema);

//Routes------------------------------------------------------------------------
app.get("/",(req,res)=>{
  res.render("indexEnglish");
});
app.get("/indexSpanish",(req,res)=>{
  res.render("indexSpanish");
});
app.get("/bodyEnglish",(req,res)=>{
  res.render("bodyEnglish");
});
app.get("/bodySpanish",(req,res)=>{
  res.render("bodySpanish");
});
app.get("/ProjectsFinal",(req,res)=>{
  res.render("ProjectsFinal");
});

//POST1------------------------------------------------------------------
app.post("/register", function(req,res){
  //console.log(req.body);
//Create transporter------------------------------------------------------------
//  var transporter = nodemailer.createTransport({
//    service:"gmail",
//    auth:{
//      user: 'alvaradojaime286@gmail.com',
//      pass: '@15JPXiaoli74',
//         }
//   });
//Create HTML-------------------------------------------------------------------
//  const {name,email,message} = req.body;
//  contentHTML =`
//      <h1>User Information</h1>
//      <ul>
//        <li><h3>Username:</h3> ${name}</li>
//        <li><h3>email:</h3><a href= ${email}> ${email}</a></li>
//      </ul>
//        <h2>Message:</h2>
//        <p>${message}</p>
//  `;
  //console.log(contentHTML);
//Create send mail--------------------------------------------------------------
//  const mailOptions = {
//       from:req.body.name,
//       to:'alvaradojaime286@gmail.com',
//       subject:req.body.subject,
//       html:contentHTML
//       }
//  transporter.sendMail(mailOptions,(error,info)=>{
//    if(error){
//      console.log(error);
//      res.send('error');
//      }else{
//      console.log("Email sent");
//      res.render("successEnglish");
//         }
//  });
  let newData = new Data({
    create: new Date,
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject,
    message:req.body.message
  })
    newData.save();
    res.render("successEnglish");
  //res.redirect("/");
});
//---POST2----------------------------------------------------------------------
app.post("/rank", function(req,res){
  rating1 = req.body.rating;
 console.log(rating1);
 let newData = new Data({
     create: new Date,
     NumberStar:rating1,
     nameReport:req.body.nameReport
    });
    newData.save();
 res.render("tx");
});

//--------FunctionStar-----------------------------------------------------------
function result1() {
  const form = document.querySelector('form');
  form.addEventListener('submit', event => {
    const formData = new FormData(event.target);
    const rating = formData.get('rating');
});
};
//---------------------SERVER-----------------------------------------------------
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on 3000");
});
