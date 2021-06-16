const express = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  role: { type: String, default: "member" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);


