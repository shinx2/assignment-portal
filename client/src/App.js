import "./App.css";
import { Switch, Route } from "react-router-dom";

// pages
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import ScorePage from "./pages/ScorePage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import AssignQuestionsPage from "./pages/AssignQuestionsPage";
import MyProfilePage from "./pages/MyProfilePage";
import ErrorPage from "./pages/ErrorPage";
import AssignmentToUserPage from "./pages/AssignmentToUserPage";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DeleteUserPage from "./pages/DeleteUserPage";

function App() {
  const user = useContext(UserContext);

  return (
    <>
      <Nav />
    <div className="App">
      <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>
      <Route exact path="/dashboard">
        <DashboardPage />
      </Route>
      <Route exact path="/question">
        <QuestionPage />
      </Route>
      <Route exact path="/score">
        <ScorePage />
      </Route>
      <Route exact path="/myprofile">
        <MyProfilePage />
      </Route>
      {user.state.user.role === "admin" && (
        <Route exact path="/assignquestions">
          <AssignQuestionsPage />
        </Route>
      )}
      {user.state.user.role === "admin" && (
        <Route exact path="/createquestion">
          <CreateQuestionPage />
        </Route>
      )}
      {user.state.user.role === "admin" && (
        <Route exact path="/addassignmenttouser">
          <AssignmentToUserPage />
        </Route>
      )}
        {user.state.user.role === "admin" && (
        <Route exact path="/admindashboard">
          <AdminDashboardPage />
        </Route>
      )}
       {user.state.user.role === "admin" && (
        <Route exact path="/deleteuser">
          <DeleteUserPage />
        </Route>
      )}
      <Route>
        <ErrorPage />
      </Route>
      </Switch>
    </div>
    </>
  );
}

export default App;
