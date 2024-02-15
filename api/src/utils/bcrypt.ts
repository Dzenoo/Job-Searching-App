import bcrypt from "bcryptjs";

const hashPassword = async <T extends string>(password: T): Promise<string> => {
  return await bcrypt.hash(password, 8);
};

const comparePassword = async <T extends string>(
  newPassword: T,
  password: T
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(newPassword, password);
  return isMatched;
};

export { hashPassword, comparePassword };
