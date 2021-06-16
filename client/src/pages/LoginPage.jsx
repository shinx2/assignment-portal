import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { UserContext } from "../context/UserProvider";
import { LOGIN_SUCCESS } from "../actions/types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (attr) => (event) => {
    setInputValues({ ...inputValues, [attr]: event.target.value });
  };

  function callLoginApi() {
    axios
      .post("/sessionsbackend", {
        username: inputValues.username,
        password: inputValues.password,
      })
      .then((res) => {
        console.log(res.data.message); //when there's error res.data.message got !

        if (res.data.message) {
          setAlertMessage(res.data.message);
        } else {
          setAlertMessage(
            "Login success, you will be redirected to the homepage"
          );
          user.dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
    useEffect(()=>{
      setTimeout(() => {
        if (user.state.user.role === "admin") {
        history.push("/admindashboard");
       } else if (user.state.user.role === "member"){
        history.push("/dashboard");
       } else{

       }
      }, 3000);
    },[user])


  const handleLogIn = (e) => {
    e.preventDefault();
    setOpen(true);
    console.log("BUTTON LOGIN CLICKED");
    console.log(inputValues.username, inputValues.password);
    if (sessionStorage.getItem("user") === null) {
      callLoginApi();
    } else if (JSON.parse(sessionStorage.getItem("user")).isAuthenticated) {
      //user is login
      setAlertMessage("User already login, please logout!");
    } else {
      callLoginApi();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Login
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={inputValues.username}
                onChange={handleChange("username")}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogIn}
              >
                LogIn
              </Button>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
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
        message={alertMessage}
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
  

export default LoginPage;