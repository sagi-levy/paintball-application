import { Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context/auth.context";
import useActivityCard from "../hooks/useActivityCard";
const ProtectedRoute = ({ tasks, children, myTasks }) => {
  const { id } = useParams();

  // const thisSpecificCard = useActivityCard(id);
  // console.log(thisSpecificCard);
  // need to fix this code that user can edit/delete only his activities
  // now i get props as undefined
  const { user } = useAuth();
  // console.log(id);
  // console.log(user._id);
  // console.log(myTasks);
  // console.log("tasks:", tasks);
  if (tasks === undefined) {
    console.log("now its empty array");
  } else {
    console.log("now it got the data from server");
  }
  if (
    !user
    //  ||
    // !myTasks ||
    // myTasks.length === 0 ||
    // user._id !== id ||
    //myTasks[0].user_id !== user._id /*(onlyBiz && !user.biz)*/
  ) {
    return <Navigate to="/" />;
  } else if (myTasks && tasks === undefined) {
    return;
  }
  // else if(myTasks[0].user_id){
  // // console.log(tasks,user._id,tasks.find(user => user._id === myTasks[0].user_id))
  // // console.log(myTasks)
  // }

  {
    return children;
    //return <Navigate to="/" />;
  }
};
export default ProtectedRoute;
