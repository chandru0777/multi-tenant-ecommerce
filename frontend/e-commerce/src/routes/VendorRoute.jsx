import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function VendorRoute({
  children
}) {

  const {
    user
  } = useAuth();

  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    );

  }

  if (
    user.role !==
    "vendor"
  ) {

    return (
      <Navigate
        to="/"
      />
    );

  }

  return children;

}

export default VendorRoute; 