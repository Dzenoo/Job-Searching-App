import { Response } from "express";

/**
 * Validates the provided data object against the allowed properties.
 * @param allowedProperties - Array of allowed property names.
 * @param data - Data object to validate.
 * @param callback - Callback function to handle the validation result.
 */
const validate = (
  allowedProperties: string[],
  data: Record<string, any>,
  callback: (error: boolean, message: string) => void
): void => {
  const disallowedProperties = Object.keys(data).filter(
    (prop) => !allowedProperties.includes(prop)
  );

  if (disallowedProperties.length > 0 || Object.keys(data).length === 0) {
    return callback(true, "Data is not valid or empty, please try again");
  }

  return callback(false, "Data is valid");
};

/**
 * Sends a standardized response from the server.
 * @param message - The message or data to send in the response.
 * @param statusCode - HTTP status code.
 * @param response - Express response object.
 */
function sendResponse<Q extends number, Y extends Response>(
  message: any,
  statusCode: Q,
  response: Y
): void {
  response.status(statusCode).send(message);
}

export { validate, sendResponse };
