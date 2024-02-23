import { Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context/auth.context";
import useActivityCard from "../hooks/useActivityCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRouteOnlyBiz = ({ children, onlyBiz }) => {
  const { user } = useAuth();
  console.log(user);

  if (!user.biz) {
    // console.log("no xx", x);
    return <Navigate to="/calendar" />;
  }
  {
    return children;
  }
};
export default ProtectedRouteOnlyBiz;
