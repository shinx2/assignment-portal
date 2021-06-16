import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { LOGOUT_SUCCESS } from "../actions/types";


const Nav = () => {

  const history = useHistory();
  const classes = makeStyles();
  const user = useContext(UserContext);
  const [profileAnchor, setProfileAnchor] = useState(null);


  const handleClickProfile = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setProfileAnchor(null);
  };

  //useEffect, callling of APIS
  useEffect(() => {
   console.log(user)
   console.log(user.state.isAuthenticated);
  }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>

        <Button
          color="inherit"
          onClick={() => {
            history.push("/");
          }}
        >
          Assignment Portal
        </Button>

        <div style={{ flexGrow: 1 }}></div>

        {!user.state.isAuthenticated && (
          <Button
            color="inherit"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Sign Up
          </Button>
        )}
        {!user.state.isAuthenticated && (
          <Button
            color="inherit"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        )}
        {JSON.parse(sessionStorage.getItem("user"))?.user?.role === "admin" && (
          <Button
            color="inherit"
            onClick={() => {
              history.push("/admindashboard");
            }}
          >
          Admin Portal
          </Button>
        )}

{JSON.parse(sessionStorage.getItem("user"))?.user?.role === "member" && (
          <Button
            color="inherit"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
          Student Portal
          </Button>
        )}

        {user.state.isAuthenticated && (
          <>
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClickProfile}
            >
              {user.state.user.username}
              <ArrowDropDownIcon fontSize="small" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={profileAnchor}
              keepMounted
              open={Boolean(profileAnchor)}
              onClose={handleCloseProfile}
            >
              <MenuItem
                onClick={() => {
                  history.push("/myprofile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push("/");
                  user.dispatch({ type: LOGOUT_SUCCESS, payload: {} });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
