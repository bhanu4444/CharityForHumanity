
// Require all of the modules u need
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    session = require('express-session'),
    Charity = require("./models/charity"),
    logger = require("morgan"),
    methodOverride = require("method-override");

//requiring routes
var charityRoutes = require("./routes/charities"),
    indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/charity_for_humanity';

mongoose.connect(databaseUri)
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));


      //Sets views folder for views
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
//require moment
app.locals.moment = require('moment');

app.use("/", indexRoutes);
app.use("/charities", charityRoutes);

// //get landing page
// app.get("/",function(request, response){
//     response.render("landing");
// });

// app.get("/charities", function(request, response){
//     var charities = [
//         { name: "Save water save lives", image: "https://cdn.pixabay.com/photo/2017/06/16/18/30/save-water-2409941_960_720.jpg"},
//         { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg"},
//         { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg" },
//         { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg" },
//         { name: "Let's end Poverty", image: "https://cdn.pixabay.com/photo/2014/10/30/19/22/poverty-509601_960_720.jpg" }
//     ];
//     response.render("index", {charities: charities});
// });

//To start server
app.listen(3000, function(request, response){
    console.log("Server started");
});