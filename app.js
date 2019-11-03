
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
    User    = require("./models/user"),
    logger = require("morgan"),
    methodOverride = require("method-override");

//requiring routes
var charityRoutes = require("./routes/charities"),
    indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/charity_for_humanity';

mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));


//Sets views folder for views
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));


app.use(require("express-session")({
    secret: "akljdflkdnlf2310830984098109",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
//Authentication 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This middleware will make currentUser, flash success and error available to all templates
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use("/", indexRoutes);
app.use("/charities", charityRoutes);


//Server started here
app.listen(3000, function(request, response){
    console.log("Server started");
});
