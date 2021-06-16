import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"; 

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const CreateQuestionPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    // const [inputQuestions, setInputQuestions] = useState("");
    // const [inputAnswers, SetInputAnswers] = useState(0);
    const [inputValues, setInputValues] = useState({
        name: "",
        description: "",
        question: "",
        answer: 0,
      });   
    
      const handleChange = (attr) => (e) => {
        setInputValues({...inputValues, [attr]: e.target.value });
      };    

    const handleSubmitAssignment = (e) => {
        e.preventDefault();
        setOpen(true);
        // setInputQuestions("");
        // SetInputAnswers(Number);
        console.log("BUTTON LOGIN CLICKED");
        axios
          .post("/assignmentsbackend", {
            name: inputValues.name,
            description: inputValues.description,
            questionsCart: [],
          })
          .then((res) => {
            console.log(res.data.data);
          })
          .catch((err) => {
            console.log(err);
        });
      }

        const handleSubmitQuestion = (e) => {
          e.preventDefault();
          setOpen(true);
        axios
          .post("/questionsbackend", {
            question: inputValues.question,
            answer: inputValues.answer, 
          })
          .then((res) => {
            console.log(res.data.data);
          })
          .catch((err) => {
            console.log(err);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };
    
    return (
        <>
        <h1>Create Assignment</h1>
        <form className={classes.form} noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                value={inputValues.name}
                onChange={handleChange("name")}
                autoFocus
              />
            </Grid>
            <br/>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={inputValues.description}
                onChange={handleChange("description")}
              />
            </Grid>
            </Grid>
            <br/>
            <br/>
            <Button
              size="small"
              aria-label="close"
              color="secondary"
              variant="contained"              
              onClick={(e)=>{
                handleSubmitAssignment(e);
                setInputValues({
                  name: "",
                  description: "",
                  question: "",
                  answer: 0,
                  })}}
            >Create Assignment</Button> 
               <Button
              size="small"
              aria-label="close"
              color="primary"
              variant="contained"
             onClick={(e)=>{
              handleSubmitAssignment(e);
                history.push("/admindashboard");
            }}
            > Save and Exit</Button>
        <h1>Create Questions</h1>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="question"
                variant="outlined"
                required
                fullWidth
                id="question"
                label="Question"
                value={inputValues.question}
                onChange={handleChange("question")}
                autoFocus
              />
            </Grid>
            <br/>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="answer"
                label="Answer"
                name="answer"
                autoComplete="answer"
                value={inputValues.answer}
                onChange={handleChange("answer")}
              />
            </Grid>
            </Grid>
            <br/>
            <br/>
          <Button
              size="small"
              aria-label="close"
              color="secondary"
              variant="contained"              
              onClick={(e)=>{
                handleSubmitQuestion(e);
                setInputValues({
                  name: "",
                  description: "",
                  question: "",
                  answer: 0,
                  })}}
            > Add More Questions</Button> 
               <Button
              size="small"
              aria-label="close"
              color="primary"
              variant="contained"
             onClick={(e)=>{
              handleSubmitQuestion(e);
                history.push("/admindashboard");
            }}
            > Save and Exit</Button>
            </form>
            </>

    )
};

export default CreateQuestionPage;