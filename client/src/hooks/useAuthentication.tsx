import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type AuthData = {
  isAuthenticated: boolean;
  userType: string | null;
  token: string | null;
  userId: string | null;
};

const useAuthentication = () => {
  const storeCookieHandler = React.useCallback((token: string) => {
    Cookies.set("token", token, { expires: 7 });
  }, []);

  const deleteCookieHandler = React.useCallback(() => {
    Cookies.remove("token");
    window.location.href = "/login";
  }, []);

  const getCookieHandler = React.useCallback((): AuthData => {
    const token = Cookies.get("token");

    if (!token) {
      return {
        isAuthenticated: false,
        userType: null,
        token: null,
        userId: null,
      };
    }

    try {
      const decoded: any = jwtDecode(token);
      const userType = decoded.userType;
      const isSeeker = userType === "seeker";

      return {
        isAuthenticated: true,
        userType: decoded.userType,
        token,
        userId: isSeeker ? decoded.seekerId : decoded.employerId,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        userType: null,
        token: null,
        userId: null,
      };
    }
  }, []);

  return { deleteCookieHandler, storeCookieHandler, getCookieHandler };
};

export default useAuthentication;
