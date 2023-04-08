import { createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { DotLoader } from "react-spinners";

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
  const [employerProfile, setEmployerProfile] = useState();
  const [seekerProfile, setSeekerProfile] = useState();
  const [isLoading, setisLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("type"));
  const checkType = userData === "Employer";

  if (!checkType) {
    url = `http://localhost:8000/api/seeker/${userId}/profile/`;
  } else {
    url = `http://localhost:8000/api/employer/${userId}/profile/`;
  }

  console.log(userId);

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
          setSeekerProfile(data.seeker);
          localStorage.setItem("seeker", JSON.stringify(data.seeker));
        } else {
          setEmployerProfile(data.employer);
          localStorage.setItem("employer", JSON.stringify(data.employer));
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setisLoading(false);
      }
    };

    fetchProfile();
  }, [token, checkType, userId]);

  if (isLoading) {
    return (
      <div className="loader_center">
        <DotLoader />;
      </div>
    );
  }

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
