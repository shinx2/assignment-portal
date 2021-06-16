import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { QuestionContext } from "../context/QuestionProvider";
import { useHistory } from "react-router-dom"; 
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Alert from "@material-ui/lab/Alert";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});



const QuestionCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const question = useContext(QuestionContext);
  const [inputValue, setInputValue] = useState(0);  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
      console.log(typeof(props.answer))
      console.log(typeof(inputValue))
    if (props.answer === Number.parseInt(inputValue)){
        correctAnswer(true);
      }else{
        correctAnswer(false);
    }
  };
  // create boolen for answer
  const correctAnswer = (isCorrect) =>{

        console.log("Correct Answer function run!")
        // set boolean to true or false
        let currentQuestion = question.questions;
        currentQuestion.map((val)=>{
          if(val.questionId._id === props.id){
              val.questionId.isCorrect = isCorrect;
          }
        })
        console.log(currentQuestion)
        question.setQuestions(currentQuestion);
        setIsSubmitted(true);

  }

    return (
        <>
<Container justify="center">
    <Grid item xs={12} align="center">
    <Card className={classes.root} variant="outlined">
    <b>Question {props.index}:</b>
      <CardContent>
        {/* <Typography className={classes.title} color="black" gutterBottom>
        <b>{props.id}</b>
        </Typography> */}
        <Typography className={classes.pos} color="black">
          <b>{props.question}</b>
        </Typography>
        <TextField size="small"
  id="outlined-basic" 
  label="Your Answer" 
  variant="outlined"
  value={inputValue}
  onChange={handleChange}></TextField>
  {/* {props.isCorrect ? <h3> True </h3> : <h3> False</h3>} */}
  <br/><br/>
        <Button size="small"
        colour="primary"
        variant="contained"
        disabled={isSubmitted}
        onClick={handleSubmit}>Save Answer</Button>
        {isSubmitted && <Alert severity="info">Question {props.index} has been submitted</Alert>}
  </CardContent>
      </Card>
      </Grid>
      </Container>
        
        {/* <h1>Question {props.index}</h1>
        <h1>{props.id}</h1>
        <h1>{props.question}</h1>
    <form> */}
        </>

    )
}

export default QuestionCard;