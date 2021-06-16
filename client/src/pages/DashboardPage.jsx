import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AssignmentCard from "../components/AssignmentCard";
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



const DashboardPage = () => {
  const user = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  const classes = useStyles();

  useEffect(()=>{
    axios
      .get(`/assignmentcartsbackend/${user.state.user._id}`, {})
      .then((res) => {
        console.log(res.data.data.assignmentsCart)
        setAssignments(res.data.data.assignmentsCart);

      })
      .catch((err) => {
        console.log(err);
      });
  },[])

  return (
    
    <div className={classes.root}>
        <Container >
          <Grid container direction="column"
  alignItems="center"
  justify="center" spacing={0}>

            {
              assignments.map((assignment, index)=>{
                return (
                    <Grid item xs={12} >
                      <AssignmentCard index={index + 1} id={assignment.assignmentId._id} name={assignment.assignmentId.name} description={assignment.assignmentId.description}/>
                    </Grid>
                );
              })
            }
      
          </Grid>
        </Container>
    </div>
  );
};

export default DashboardPage;
