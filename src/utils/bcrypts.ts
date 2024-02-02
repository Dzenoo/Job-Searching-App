import bcrypt from "bcryptjs";

export const hashPassword = async <T extends string>(
  password: T,
): Promise<string> => {
  return await bcrypt.hash(password, 8);
};

export const comparePassword = async <T extends string>(
  newPassword: T,
  password: T,
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(newPassword, password);
  return isMatched;
};
