const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const isUserAuthenticated = require("../passport/middleware");
const { userValidSchema } = require("../validation/validationSchemas");

// --------------------------------------- CONSTANTS ---------------------------------------
const users = express.Router();
const saltRounds = 10;

// --------------------------------------- ROUTES ---------------------------------------

// SHOW User route
users.get("/", (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) {
      res.status(400).send({ error: error, message: "Unable to find all users",data:{} });
  } else {
      res.status(200).send({error: null, message:"Find all users success!", data: allUsers});
  }
});
});
  // console.log(req.isAuthenticated());
  // res.send(req.user); //recall that the entire user and session is stored inside of req.user when authenticated with passport.
  // res.json() returns a similar response as res.send().
// });

// CREATE User route
users.post("/", (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  const result = userValidSchema.validate(newUser); // result has two properties, "error" and "value". "error" is undefined if no error. value will be user object
  // console.log(result.error.message);

  if (result.error) {
    // 1st Level Validation by Joi. Check that fields are valid and not empty.
    res.send({ message: result.error.message });
  } else {
    // do validation checks: if fields empty, or if user already exists.
    User.findOne({ username: result.value.username }, (err, foundUser) => {
      // 2nd Level Validation. Check that user does not currently exist.
      if (foundUser) {
        res.send({
          message: `'${result.value.username}' has already been registered!`,
        });
      } else {
        bcrypt.hash(result.value.password, saltRounds, (err, hash) => {
          if (err) {
            res.send(err);
          } else {
            // if all is successful, change the password to the user to the hash.
            result.value.password = hash;
            User.create(result.value, (err, createdUser) => {
              if (err) {
                res.send(err);
              } else {
                console.log(createdUser);
                res.send(createdUser); // send the createdUser obj back to client as a response.
                // TO DO: authenticate user immediately and log them in after registration?
              }
            });
          }
        });
      }
    });
  }
});

// try {
// } catch (error) {
//   if (error.isJoi === true) {
//     error.status = 422;
//     next(error);
//   }
// }

// EDIT User Route
users.put("/:id", isUserAuthenticated, (req, res) => {
  const editedUser = req.body;
  bcrypt.hash(editedUser.password, saltRounds, (err, hash) => {
    if (err) {
      res.send(err);
    } else {
      editedUser.password = hash;
      User.findByIdAndUpdate(
        req.params.id,
        { ...editedUser },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            res.send({ message: "Did not update successfully." });
          } else {
            res.send(updatedUser);
          }
        }
      );
    }
  });

  // if (req.isAuthenticated()) {
  //   //built-in method of passport to check if current user is authenticated. returns a boolean
  // } else { // not necessary since middleware has been used
  //   res.send({ message: "Request is denied. Not a valid login session." });
  // }
});

users.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        message: "User has been successfully deleted!",
        data: deletedUser
      });
    }
  });

  // if (req.isAuthenticated()) {
  //   //built-in method of passport to check if current user is authenticated. returns a boolean
  // } else {
  //   res.send({ message: "Request is denied. Not a valid login session." });
  // }
});

module.exports = users;