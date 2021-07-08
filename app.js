const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME : firstName,
          LNAME : lastName
        }
      }

    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchip.com/3.0/lists/39e50f6e30";

  const options = {
    method : "POST",
    auth : "aditya1:b4a25057da23a8577a53e3924dcaf28b-us6"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000 , function(){
  console.log("The server is running on port 3000.");
});
