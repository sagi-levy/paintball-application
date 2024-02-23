import { Navigate } from "react-router-dom";

import { useAuth } from "../context/auth.context";

const ProtectedRouteOnlyBiz = ({ children, onlyBiz }) => {
  const { user } = useAuth();

  if (!user.biz) {
    return <Navigate to="/calendar" />;
  }
  {
    return children;
  }
};
export default ProtectedRouteOnlyBiz;
