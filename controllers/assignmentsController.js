const express = require("express");
const assignments = express.Router();
const Assignment = require("../models/assignment.js");



//find by catergories
// assignments.get("/:categories", (req, res) => {
//     Assignment.find({ category: req.params.categories }, (err, productCategory) => {
//         if (err) {
//             res.status(400).send({ message: "Unable to find category." });
//         } else {
//             res.status(200).send(productCategory);
//         }
//     });
// });

// show all assignment
assignments.get("/", (req, res) => {
    Assignment.find({}, (err, allAssignments) => {
        if (err) {
            res.status(400).send({ error: error, message: "Unable to find all assignments",data:{} });
        } else {
            res.status(200).send({error: null, message:"Find all assignments success!", data: allAssignments});
        }
    });
});

//find by ID
assignments.get("/findassignment/:id", (req, res) => {
    Assignment.findById(req.params.id, (err, assignmentID) => {
        if (err) {
            res.status(400).send({ error: error, message: "Unable to find assignment ID.",data:{} });
        } else {
            res.status(200).send({error: null, message:"Find assignment ID success!", data: assignmentID});
        }
    }).populate("questionsCart.questionId");
    ; 

});

//add new assignment 
assignments.post("/", (req, res) => {
    Assignment.create(req.body, (error, createAssignment) => {
        if (error) {
            res.status(400).send({ error: error, message: "Unable to create new assignment.",data:{} });
        } else {
            res.status(200).send({error: null, message:"create assignment success", data: createAssignment});
        }
    });
});

// edit assignement 
assignments.put("/:id", (req, res) => {
    Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, updatedAssignment) => {
            if (err) {
                res.status(400).send({ error: error, message: "Unable to edit assignment.",data:{} });
            } else {
                res.status(200).send({error: null, message:"Edit assignment success", data: updatedAssignment});
            }
        }
    ).populate("questionsCart.questionId");
});

// delete 
assignments.delete("/:id", (req, res) => {
    Assignment.findByIdAndRemove(req.params.id, (err, deletedAssignment) => {
        if (err) {
            res.status(400).send({ error: error, message: "Unable to delete assignment.",data:{} });
        } else {
            res.status(200).send({error: null, message:"Delete assignment success", data: deletedAssignment});
        }
    });
});


module.exports = assignments;