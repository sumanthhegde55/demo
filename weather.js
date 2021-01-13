const express = require("express");
const bodyParser = require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  var city=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q=" +city+"&appid=d9613a15f35a5d1cd0c5ca77204a5205&units=metric";
  https.get(url,function(res1){
    res1.on("data",function(data){
      const wdata=JSON.parse(data);
      const temp=wdata.main.temp;
      const desc=wdata.weather[0].description;
      const icon=wdata.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + city + " is : " +temp + " degress Celsius</h1>");
      res.write("<p> The weather is currently " + desc + "</p>");
      res.write("<img src="+imageURL+">");
      // res.redirect(__dirname+ "index.html");
      res.write('<form action="/redirect" method="POST"><button type="submit" name="button">Try Another!</button></form>');
        res.send();
      // res.redirect(__dirname + "/redirect.html");
      // res.sendFile(__dirname + "/redirect.html");
    });
  });
});
app.post("/redirect",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server is working at port 3000");
});
