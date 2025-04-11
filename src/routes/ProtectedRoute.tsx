import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { JSX } from "react";
import { getDecryptedToken } from "../utils/token";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const reduxToken = useSelector((state: RootState) => state.auth.token);
  const localToken = getDecryptedToken();

  const isAuthenticated = !!reduxToken || !!localToken;

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
