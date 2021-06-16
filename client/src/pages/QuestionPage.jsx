import React, { useEffect, useState, useContext, useDebugValue } from "react";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AssignmentCard from "../components/AssignmentCard";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { AssignmentContext } from "../context/AssignmentProvider";
import QuestionCard from "../components/QuestionCard";
import { QuestionContext } from "../context/QuestionProvider";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 100,
  },
}));

const QuestionPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const assignment = useContext(AssignmentContext);
  const question = useContext(QuestionContext);
  const [alertMessage, setAlertMessage] = useState("");
  //question ={questions,setQuestions}
  const user = useContext(UserContext);
  useEffect(() => {
    //http://localhost:4000/assignmentsbackend/findassignment/60966b36fa0e22a036e8104d
    axios
      .get(
        `/assignmentsbackend/findassignment/${assignment.selectedAssignmentId}`,
        {}
      )
      .then((res) => {
        console.log(res.data.data.questionsCart);
        question.setQuestions(res.data.data.questionsCart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const callAssignmentCart = () => {
    //calculate score
    let currentScore = 0;
    question.questions.map((question, index) => {
      //question.questionId.isCorrect
      if (question.questionId.isCorrect === true) {
        currentScore += 1;
      }
    });
    // Get assignmentCart
    axios
      .get(`/assignmentcartsbackend/${user.state.user._id}`, {})
      .then((res) => {
        console.log(res.data.data.assignmentsCart);

        let newAssignmentCart = res.data.data.assignmentsCart;
        newAssignmentCart.map((val) => {
          if (val.assignmentId._id === assignment.selectedAssignmentId) {
            val.latestScore = currentScore;
          }
        });
        // update the latest score.---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        axios
          .put(`/assignmentcartsbackend/${user.state.user._id}`, {
            userId: user.state.user._id,
            assignmentsCart: newAssignmentCart,
          })
          .then((res) => {
            //SNACKBAR  assignment  submitted, will be redirected  to dashboard.
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Container>
        <h1>QUESTION PAGE</h1>
        <Typography className={classes.pos} variant={"h6"} color="black">
          {
            "Please ensure that you save answer for all questions. Unsubmitted answer will be treated as incorrect."
          }
        </Typography>
        <Grid container spacing={3} align="center">
          {question.questions.map((question, index) => {
            return (
              <Grid item xs={6}>
                <br />
                <QuestionCard
                  index={index + 1}
                  id={question.questionId._id}
                  question={question.questionId.question}
                  answer={question.questionId.answer}
                  isCorrect={question.questionId.isCorrect}
                />
              </Grid>
            );
          })}
          {/* <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "middle",
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={alertMessage}
            action={
              <>
                <IconButton
                  size="small"
                  colour="primary"
                  variant="contained"
                  onClick={() => {
                    callAssignmentCart();
                    history.push("/score");
                  }}
                >
                  Save and Submit
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          /> */}
          <br/>
          <Grid container>
          <Grid item xs={12}>
          <Button
          size="large"
          aria-label="close"
          color="secondary"
          variant="outlined"
            onClick={() => {
              callAssignmentCart();
              history.push("/dashboard");
            }}
          >
            Save and Submit
          </Button>
          </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default QuestionPage;
