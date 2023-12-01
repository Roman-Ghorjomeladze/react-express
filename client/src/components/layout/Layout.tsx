import { useLocation } from "react-router-dom";
import { PropsWithChildren, useEffect, useMemo } from "react";

import { useAuth } from "../../context/AuthContext";

export const Layout = (props: PropsWithChildren) => {
  const { isAuthenticated, loadingAuth, authCheck } = useAuth();
  const location = useLocation();
  const profileId = useMemo(() => localStorage.getItem('profile_id'), [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && profileId && !loadingAuth && location.pathname !== '/') {
      authCheck();
    }
    if (!profileId && location.pathname !== '/') {
      window.location.pathname = '/';
    }
  }, [isAuthenticated, loadingAuth, location.pathname, profileId]);

  if (isAuthenticated || location.pathname === "/") {
    return <>{props.children}</>;
  }
  return <div style={{ backgroundColor: "#282A36" }}></div>;
};
