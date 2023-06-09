import { redirect } from "react-router-dom";

export function checkAuth() {
  const token = JSON.parse(localStorage.getItem("userData"));

  if (!token) {
    return redirect("/auth/login");
  }

  return token;
}

export function checkEmployer() {
  const employer = JSON.parse(localStorage.getItem("employer"));

  if (!employer) {
    return redirect("/auth/login");
  }

  return employer;
}

export function isSignuped() {
  const isLoggedIn = JSON.parse(localStorage.getItem("userData"));

  if (isLoggedIn) {
    return redirect("/");
  }

  return isLoggedIn;
}
