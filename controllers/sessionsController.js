const bcrypt = require("bcrypt");
const express = require("express");
const passport = require("passport");
const User = require("../models/users");
require("../passport/passportConfig")(passport);

// --------------------------------------- CONSTANTS ---------------------------------------
const sessions = express.Router();


// --------------------------------------- ROUTES ---------------------------------------

// LOG IN Route
sessions.post("/", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log(user) // a boolean determining if a user is found or not.
        if (err) {
            res.send(err);
        } else if (!user) {
            res.send(info)
        } else {
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    // **** IMPORTANT: WHEN LOGIN OPERATION IS COMPLETE, the "user" object will be assigned to req.user which can then be accessed in ANY ROUTE to find the current user.
                    res.send(req.user); 
                }
            })
        }
    })(req, res, next); // this gives the authenticate callback access to the req and res object through closure

})

sessions.get("/", (req, res) => {
    req.logout()
    res.send({message: "Successfully Logged Out!"})
})

module.exports = sessions;