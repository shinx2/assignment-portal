const express = require("express");
const assignmentcarts = express.Router();
const assignmentCart= require("../models/assignmentCart.js");


assignmentcarts.post("/", (req, res) => {

  // CREATE assignment cart
  assignmentCart.create(req.body, (err, createdCart) => {
    if (err) {
      res
        .status(400)
        .send({ error: err.message, message: " Create Assignemnt Cart unsuccessful!", data: {} });
    } else {
      res.status(200).send({
        error: null,
        message: "Create Assignment Cart Success!",
        data: createdCart,
      });
    }
  });
});

// Only can view own assignment cart. 
assignmentcarts.get("/:id", (req, res) => {
  assignmentCart.findById(req.params.id, (err, latestCart) => {
    if (err) {
      res.status(400).send({
        error: err.message,
        message: "Retrieve assignment cart unsuccessful!",
        data: {},
      });
    } else {
      res.status(200).send({
        error: null,
        message: "Retrieve assignment cart success!",
        data: latestCart,
      });
    }
  }).populate("userId")
    .populate("assignmentsCart.assignmentId");
});

//DELETE 
// userassignments.delete("/:id", (req, res) => {
//   Order.findByIdAndRemove(req.params.id, (err, deletedOrder) => {
//     if (err) {
//       res.status(400).send({
//         error: err.message,
//         message: "Delete order unsuccessful!",
//         data: {},
//       });
//     } else {
//       res.status(200).send({
//         error: null,
//         message: "Delete order success!",
//         data: deletedOrder,
//       });
//     }
//   });
// });

// UPDATE 
assignmentcarts.put("/:id", (req, res) => {
  assignmentCart.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedCart) => {
      if (err) {
        res.status(400).send({
          error: err.message,
          message: "Update assignment cart unsuccessful!",
          data: {},
        });
      } else {
        res.status(200).send({
          error: null,
          message: "Updated assignment cart success!",
          data: updatedCart,
        });
      }
    }
  )
    .populate("userId")
    .populate("assignmentsCart.assignmentId");


});

module.exports = assignmentcarts;
