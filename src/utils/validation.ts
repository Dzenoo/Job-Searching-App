import { Response } from "express";

const validate = (
  allowedProperties: string[],
  data: { [key: string]: any },
  cbl: (error: boolean, message: string) => void
) => {
  const disallowedProperties = Object.keys(data).filter(
    (prop) => !allowedProperties.includes(prop)
  );

  if (disallowedProperties.length > 0 || Object.keys(data).length === 0) {
    return cbl(true, "Data is not valid or empty, please try again");
  } else {
    return cbl(false, "Data is valid");
  }
};

function responseServerHandler<Q extends number, Y extends Response>(
  message: any,
  code: Q,
  response: Y
) {
  response.status(code).send(message);
}

export { validate, responseServerHandler };
