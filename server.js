require("dotenv-safe").config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");


// --------------------------------------- CONSTANTS ---------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET;


// --------------------------------------- MIDDLEWARE ---------------------------------------
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}))
app.use(express.json()); 
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());


// --------------------------------------- CONTROLLERS ---------------------------------------
const usersController = require("./controllers/usersController");
const sessionsController = require("./controllers/sessionsController");
const assignmentCartsController = require("./controllers/assignmentCartsController")
const assignmentsController = require("./controllers/assignmentsController");
const questionsController = require("./controllers/questionsController");

app.use("/usersbackend", usersController);
app.use("/sessionsbackend", sessionsController);
app.use("/assignmentcartsbackend", assignmentCartsController);
app.use("/assignmentsbackend", assignmentsController);
app.use("/questionsbackend", questionsController);



// --------------------------------------- CONNECTIONS ---------------------------------------
if (process.env.NODE_ENV === "production") {
    // FOR HEROKU CRA
    app.use(express.static("./client/build"));
  }
  
  app.listen(PORT, () => {
    console.log("server is listening at port", PORT);
  });
  
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  
  mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
  });