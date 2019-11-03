var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function (req, res) {
    res.render("landing");
});

//Route to show register form
router.get("/register", function (req, res) {
    res.render("register", { page: 'register' });
});

//Route to handle signup logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username, firstName: req.body.firstName, lastName:req.body.lastName, email: req.body.email });
    if(req.body.adminCode === 'admin123'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register", { error: err.message });
        }
        passport.authenticate("local")(req, res, function () {
            console.log("authenticated");
            req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
            res.redirect("/charities");
        });
    });
});

//show login form
router.get("/login", function (req, res) {
    res.render("login", { page: 'login' });
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/charities",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to Charity For Humanity!'
    }), function (req, res) {
});

// logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "See you later!"); 
    res.redirect("/charities");
});

//Route to show about us
router.get("/about", function (req, res) {
    res.render("about", { page: 'about' });
});

//Route to show about us
router.get("/contact", function (req, res) {
    res.render("contact", { page: 'about' });
});

module.exports = router;