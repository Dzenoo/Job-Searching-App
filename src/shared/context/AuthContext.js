import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { BarLoader } from "react-spinners";

export const AuthContext = createContext({
  token: null,
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  checkType: true,
});

let url;

export const AuthProvider = ({ children }) => {
  const { login, logout, token, userId } = useAuth();
  const [isLoading, setisLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("type"));
  const checkType = userData === "Employer";

  if (!checkType) {
    url = `http://localhost:8000/api/seeker/${userId}/profile/`;
  } else {
    url = `http://localhost:8000/api/employer/${userId}/profile/`;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token || !userId) {
          return;
        }

        setisLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        if (!checkType) {
          localStorage.setItem("seeker", JSON.stringify(data.seeker));
        } else {
          localStorage.setItem("employer", JSON.stringify(data.employer));
        }
      } catch (err) {
      } finally {
        setisLoading(false);
      }
    };

    fetchProfile();
  }, [token, checkType, userId]);

  if (isLoading) {
    return (
      <div className="loader_center">
        <BarLoader />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
        checkType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
