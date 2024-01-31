import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import useActivityCard from "../hooks/useActivityCard";
const ProtectedRoute = ({ id, tasks, children, myTasks }) => {
  const thisSpecificCard = useActivityCard(id);
  console.log(thisSpecificCard);
  // need to fix this code that user can edit/delete only his activities
  // now i get props as undefined
  const { user } = useAuth();
  console.log(id);
  console.log(user._id);
  console.log("my tasks only",myTasks);
  console.log("tasks:", tasks);
  if (
    !user
    //  ||
    // !myTasks ||
    // myTasks.length === 0 ||
    // user._id !== id ||
    //myTasks[0].user_id !== user._id /*(onlyBiz && !user.biz)*/
  ) {
    return <Navigate to="/" />;
  } else if(user._id===myTasks[0].user_id) {
     return children;
  }
 
};
export default ProtectedRoute;
