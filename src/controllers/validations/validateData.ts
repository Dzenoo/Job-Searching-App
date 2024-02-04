export const validate = (
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
