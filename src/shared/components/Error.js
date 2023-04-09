import { Link, useRouteError } from "react-router-dom";
import PageContent from "./PageError";
import er from "../assets/error.png";

const Error = () => {
  const error = useRouteError();

  let title = "An Error Occurred";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource on page";
  }

  return (
    <h1>
      <PageContent title={title}>
        <img src={er} alt="error" />
        <p>{message}</p>
        <Link to="/" className="link">
          Go to home
        </Link>
      </PageContent>
    </h1>
  );
};

export default Error;
