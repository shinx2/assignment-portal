import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { AssignmentContext } from "../context/AssignmentProvider";
import { QuestionContext } from "../context/QuestionProvider";
import { UserContext } from "../context/UserProvider";

const ScorePage = () => {
    const assignment = useContext(AssignmentContext);
    const question = useContext(QuestionContext);
    const [currentScore, setCurrentScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const user = useContext(UserContext);

    useEffect(()=>{
        //http://localhost:4000/assignmentsbackend/findassignment/60966b36fa0e22a036e8104d
        axios
        .get(`/assignmentcartsbackend/${user.state.user._id}`, {})
        .then((res) => {
          res.data.data.assignmentsCart.map((val)=>{
            if(val.assignmentId._id === assignment.selectedAssignmentId){
              setCurrentScore(val.latestScore)
              setTotalScore(val.assignmentId.questionsCart.length)
            }
          })
  
        })
        .catch((err) => {
          console.log(err);
        });
      },[])



    return  (
        <>
        <h1>SCORE</h1>
        <h1>{currentScore}/{totalScore}</h1>
        </>
    )


}

export default ScorePage;