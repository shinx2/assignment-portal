import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const SignUpPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSignUpClick, setIsSignUpClick] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Server Errror!");
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    email: "",
    });

  const handleChange = (attr) => (event) => {
    setInputValues({ ...inputValues, [attr]: event.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setOpen(true);
    setIsSignUpClick(true);
    console.log("BUTTON LOGIN CLICKED");
    console.log(inputValues.username, inputValues.password, inputValues.email,
    );
    axios
      .post("/usersbackend", {
        username: inputValues.username,
        password: inputValues.password,
        email: inputValues.email,
      })
      .then((res) => {
        if (!res.data.message) {
          setSnackbarMessage("Sign up succesful");
          // console.log(res.data._id);

          axios.post("/assignmentcartsbackend",{     
            "_id": res.data._id,
            "userId" : res.data._id,
            "assignmentsCart": [
              {
                  "assignmentId": "60966b36fa0e22a036e8104d"
              }
            ]
          }).then(()=>{
          
            setTimeout(()=>{
              history.push("/login")
              setOpen(false);
            },3000 )

          }).catch((err) => {
            console.log(err);
          });

        } else {
          setSnackbarMessage(res.data.message);
        }
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


  useEffect(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputValues.username.length < 5) {
      setIsInputValid(true);
      setAlertMessage("Username must be more than 5 characters");
    } else if (inputValues.password.length < 8) {
      setIsInputValid(true);
      setAlertMessage("Password must be more than 8 characters");
    } else if (re.test(inputValues.email) === false) {
      setIsInputValid(true);
      setAlertMessage("Please provide valid email");
    } else {
      setIsInputValid(false);
      setAlertMessage("");
    }
  }, [inputValues]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={inputValues.username}
                onChange={handleChange("username")}
                autoFocus
              />
            </Grid>
            </Grid>
            <br/>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputValues.email}
                onChange={handleChange("email")}
              />
            </Grid>
            <br/>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"   
                value={inputValues.password}
                onChange={handleChange("password")}
              />
            </Grid>
            <br/>
            {isSignUpClick && isInputValid && <Alert severity="warning">{alertMessage}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "middle",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackbarMessage}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Container>
  );
}

export default SignUpPage;