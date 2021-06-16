import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Input from "@material-ui/core/Input";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const AssignQuestionsPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [assignmentId, setAssignmentId] = useState("");
  const [data, setData] = useState([]);
  const [questionsdata, setQuestionsData] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [formattedSelectedQuestions, setFormattedSelectedQuestions] = useState([]);

  const handleChange = (event) => {
    setSelectedQuestions(event.target.value);
  };

  const handleChangeAssignmentId = (event) => {
    console.log(event.target.value);
    setAssignmentId(event.target.value);
  };

  //on page load we get array of all assignments and questions
  useEffect(() => {
    //get all assignments
    axios
      .get("/assignmentsbackend", {})
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //get all questions
    axios
      .get("/questionsbackend", {})
      .then((res) => {
        setQuestionsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    // temp qns to empty array
    let tempselectedquestions = [];

    selectedQuestions.map((id)=>{
      tempselectedquestions.push({questionId: id});
    })
    console.log(selectedQuestions)
    console.log(tempselectedquestions)

    setFormattedSelectedQuestions(tempselectedquestions);
  },[selectedQuestions])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/assignmentsbackend/${assignmentId}`, {
        questionsCart: formattedSelectedQuestions
      })
      .then((res) => {
        console.log("Questions is assigned!")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <h1>Add questions to assignments</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.margin}>
              <InputLabel id="demo-customized-select-label">
                Select Assignment
              </InputLabel>
              <Select
                style={{ width: "350px" }}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={assignmentId}
                onChange={handleChangeAssignmentId}
                input={<BootstrapInput />}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {data.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-name-label">List of Questions</InputLabel>
              <Select
              style={{ width: "350px" }}
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={selectedQuestions}
                onChange={handleChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {questionsdata.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.question}
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
          Assign questions to assignment
        </Button>
      </form>
    </>
  );
};

export default AssignQuestionsPage;
