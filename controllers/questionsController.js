const express = require("express");
const questions = express.Router();
const Question = require("../models/question.js");



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

// show all questions
questions.get("/", (req, res) => {
    Question.find({}, (err, allQuestions) => {
        if (err) {
            res.status(400).send({ error: error, message: "Unable to find all questions",data:{} });
        } else {
            res.status(200).send({error: null, message:"Find all questions success!", data: allQuestions});
        }
    });
});

//find by ID
// questions.get("/findassignment/:id", (req, res) => {
//     Assignment.findById(req.params.id, (err, assignmentID) => {
//         if (err) {
//             res.status(400).send({ error: error, message: "Unable to find assignment ID.",data:{} });
//         } else {
//             res.status(200).send({error: null, message:"Find assignment ID success!", data: assignmentID});
//         }
//     });
// });

//add new question
questions.post("/", (req, res) => {
    Question.create(req.body, (error, createQuestion) => {
        if (error) {
            res.status(400).send({ error: error, message: "Unable to create new question.",data:{} });
        } else {
            res.status(200).send({error: null, message:"create question success", data: createQuestion});
        }
    });
});

// edit question
questions.put("/:id", (req, res) => {
    Question.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, updatedQuestion) => {
            if (err) {
                res.status(400).send({ message: "Unable to update question." });
            } else {
                res.status(200).send(updatedQuestion);
            }
        }
    );
});

// delete question
questions.delete("/:id", (req, res) => {
    Questions.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
        if (err) {
            res.status(400).send({ error: error, message: "Unable to delete question.",data:{} });
        } else {
            res.status(200).send({error: null, message:"Delete question success", data: deletedQuestion});
        }
    });
});


module.exports = questions;