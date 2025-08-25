import { Outlet } from "react-router-dom";
import useUserLikelySignedIn from "./hooks/useUserLikelySignedIn";
import Unauthenticated from "../../../pages/unauthenticated";

export const AuthRouter = () => {
  const { token } = useUserLikelySignedIn();
  return token ? <Outlet /> : <Unauthenticated />;
};
