
// Require all of the modules u need
var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

//makes an express app
var app = express();

app.set("views", path.resolve(__dirname, "views"));      //Sets views folder for views
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//get landing page
app.get("/",function(request, response){
    response.render("landing");
});

app.get("/charities", function(request, response){
    var charities = [
        { name: "Save water save lives", image: "https://cdn.pixabay.com/photo/2017/06/16/18/30/save-water-2409941_960_720.jpg"},
        { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg"},
        { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg" },
        { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg" },
        { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg" }
    ];
    response.render("index", {charities: charities});
});

//To start server
app.listen(3000, function(request, response){
    console.log("Server started");
});