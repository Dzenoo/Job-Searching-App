import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { AuthTokenError } from "../errors";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { AWS_BUCKET_NAME, AWS_REGION_NAME } from "../credentials";
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

async function initializeAws<T extends string>(
  file: any,
  key: T,
  folder: string
) {
  const client = new S3Client({
    credentials: fromEnv(),
    region: AWS_REGION_NAME,
  });

  const fileBuffer = Buffer.from(file.buffer);

  const uploads = new Upload({
    client: client,
    params: {
      Bucket: AWS_BUCKET_NAME,
      Key: `${folder}/${key}`,
      Body: fileBuffer,
    },
    leavePartsOnError: false,
  });

  return uploads;
}

const signToken = <T extends object, Q extends SignOptions>(
  payload: T,
  options?: Q
): string =>
  jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "7 days",
    ...options,
  });

const verifyToken = <T extends string>(token: T): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET! as string);

    if (payload) {
      return payload as { [key: string]: any };
    }

    throw new Error();
  } catch (error) {
    throw new AuthTokenError();
  }
};

export {
  validate,
  responseServerHandler,
  hashPassword,
  comparePassword,
  initializeAws,
  signToken,
  verifyToken,
};
