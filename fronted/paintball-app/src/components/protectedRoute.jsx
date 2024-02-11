import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = ({ tasks, children, myTasks }) => {
  const { id } = useParams();

  // console.log("my tasks :   ", myTasks);
  // console.log(" tasks :   ", tasks);
  // console.log(myTasks.length > 0);
  const { user } = useAuth();

  // console.log(user._id);
  // if (user._id === myTasks[0].phoneNumber) {
  //   console.log(true);
  // }

  if (!user) {
    return <Navigate to="/" />;
  }
  if (!user.biz) {
    if (myTasks && tasks === undefined) {
      return;
    }
  }

  {
    return children;
  }
};
export default ProtectedRoute;
