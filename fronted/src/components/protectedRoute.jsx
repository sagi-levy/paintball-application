import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = ({ tasks, children, myTasks }) => {
  const { id } = useParams();


  const { user } = useAuth();

  

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
