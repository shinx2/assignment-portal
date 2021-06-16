import React, {useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import { AssignmentContext } from "../context/AssignmentProvider";
import { useHistory } from "react-router-dom"; 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
      minWidth: 400,
    },
    title: {
      fontSize: 20,
    },
    pos: {
      marginBottom: 12,
    },
  });

const AssignmentCard = (props) => {
    const Assignment = useContext(AssignmentContext);
    const history = useHistory();
    const classes = useStyles();

const handleClick = (e) => {
    e.preventDefault()
    console.log(props.id);
    Assignment.setSelectedAssignmentId(props.id);
    history.push("/question");
}

    return (
    <>
    <br/>
    <br/>
    <br/>
       <Container >
    <Grid item xs={12}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="black" gutterBottom>
        Homework {props.index}
        </Typography>
        <Typography className={classes.pos} color="black">
          <b>{props.name}</b>
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
          <Grid container justify="center">
            <Grid item xs={4} align="center">
            <Button size="small"
        colour="primary"
        variant="contained"
        onClick={handleClick}>
        Start Now</Button>
            </Grid>
            <Grid item xs={4} align="center">
            <Button size="small"
        colour="primary"
        variant="contained"
        onClick={() => {
          Assignment.setSelectedAssignmentId(props.id);
                  history.push("/score");
                }}>
        View Score</Button>
            </Grid>
          </Grid>
      </CardActions>
    </Card>
    </Grid>
    </Container>
    </>
  );
};

export default AssignmentCard;