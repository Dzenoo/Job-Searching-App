import { redirect } from "react-router-dom";

export function checkAuth() {
  const token = JSON.parse(localStorage.getItem("userData"));

  if (!token) {
    return redirect("/auth/login");
  }

  return token;
}

export function checkEmployer() {
  const employer = JSON.parse(localStorage.getItem("emplyer"));

  if (!employer) {
    return redirect("/auth/login");
  }

  return employer;
}
