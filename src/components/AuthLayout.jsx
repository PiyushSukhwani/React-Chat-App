import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthHook from "../AuthHook";

const PrivateRoute = ({ element: Component, ...rest }) => {
  // const navigate = useNavigate();
  // const [loader, setLoader] = useState(true);
  // const authStatus = useSelector((state) => state.userAuth.authStatus);

  // useEffect(() => {
  //   if (authentication && authStatus !== authentication) {
  //     navigate("/login");
  //   } else if (!authentication && authStatus !== authentication) {
  //     navigate("/");
  //   }
  //   setLoader(false);
  // }, [authStatus, navigate, authentication]);

  // return loader ? <div className="loading">Loading...</div> : <> {children} </>;

  const { currentUser, isLoading } = AuthHook();
  const location = useLocation();
  console.log('privateroute', currentUser);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return currentUser ? Component : <Navigate to="/login" state={{from: location}}/>;
};

export default PrivateRoute;
