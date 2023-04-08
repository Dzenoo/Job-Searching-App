import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({
  token: null,
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  checkType: true,
});

export const AuthProvider = ({ children }) => {
  const { login, logout, token, userId } = useAuth();
  const userData = JSON.parse(localStorage.getItem("type"));
  const checkType = userData === "Employer";

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        checkType: checkType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
