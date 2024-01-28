import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = ({ id, children, myTasks }) => {
  // need to fix this code that user can edit/delete only his activities
  // now i get props as undefined
  const { user } = useAuth();
  console.log(id);
  console.log(user._id);
  console.log(myTasks);
  if (
    !user ||
    user._id !== id ||
    myTasks[0].user_id !== user._id /*(onlyBiz && !user.biz)*/
  ) {
    return; //<Navigate to="sign-in" />;
  }
  return children;
};
export default ProtectedRoute;
