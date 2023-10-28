import { useLocation } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

export const Layout = (props: PropsWithChildren) => {
  const { isAuthenticated, loadingAuth, authCheck } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const profileId = localStorage.getItem("profile_id");
    if (profileId) {
      authCheck();
    } else if (!isAuthenticated && location.pathname !== "/") {
      window.location.href = "/";
    }
  }, [isAuthenticated, loadingAuth]);

  if (isAuthenticated || location.pathname === "/") {
    return <>{props.children}</>;
  }
  return <div style={{ backgroundColor: "#282A36" }}></div>;
};
