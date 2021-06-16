import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const AdminDashboardPage = () => {
  const history = useHistory();

  return (
    <>
      <h1>Admin Page</h1>
      <Button
        size="small"
        aria-label="close"
        variant="outlined"
        color="primary"
        onClick={(e) => {history.push('createquestion')}}
      >
        Create Assignment and Question
      </Button>
      <br/>
      <br/>
      <Button
        size="small"
        aria-label="close"
        color="secondary"
        variant="outlined"
        onClick={(e) => {history.push('/assignquestions')}}
      >
        Assign questions to an assignment
      </Button>
      <br/>
      <br/>
      <Button
        size="small"
        aria-label="close"
        variant="outlined"
        color="primary"
        onClick={(e) => { history.push('/addassignmenttouser')}}
      >
        Add assignments to an user
      </Button>
      <br/>
      <br/>
      <Button
        size="small"
        aria-label="close"
        color="secondary"
        variant="outlined"
        onClick={(e) => {history.push('/deleteuser')}}
      >
        Delete User
      </Button>
    </>
  );
};

export default AdminDashboardPage;
