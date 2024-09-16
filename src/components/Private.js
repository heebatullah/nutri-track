import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Private({ Component }) {
  const { loggedUser } = useContext(UserContext);
  return loggedUser ? <Component /> : <Navigate to="/login" />;
}
