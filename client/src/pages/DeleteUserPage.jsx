import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import InputBase from "@material-ui/core/InputBase";



const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const DeleteUserPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [userId, setUserId] = useState("");
    const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axios
      .get("/usersbackend", {})
      .then((res) => {
        setUsersData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    const handleChangeUserId = (e) => {
        console.log(e.target.value);
        setUserId(e.target.value);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .delete(`/usersbackend/${userId}`, {

        })
          .then((res) => {
            console.log("Assignment has been assigned to User!")
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <>
       <form className={classes.form} noValidate>
        <h1>Delete User</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.margin}>
              <InputLabel id="demo-customized-select-label">
                Select User
              </InputLabel>
              <Select
                style={{ width: "350px" }}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={userId}
                onChange={handleChangeUserId}
                input={<BootstrapInput />}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {usersData.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.username}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            </Grid>
            </Grid>
          <br/>
          <br/>
        <Button
          size="small"
          aria-label="close"
          color="primary"
          variant="contained"
          onClick={(e) => {
            handleSubmit(e);
            history.push("/admindashboard");
          }}
        >
         Delete User
        </Button>
      </form>
        </>
    )
}

export default DeleteUserPage;