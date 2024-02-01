import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { AWS_BUCKET_NAME, AWS_REGION_NAME } from "../credentials";

const client = new S3Client({
  credentials: fromEnv(),
  region: AWS_REGION_NAME,
});

export async function initializeAws<T extends string>(file: any, key: T) {
  const fileBuffer = Buffer.from(file.buffer);

  const uploads = new Upload({
    client: client,
    params: {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
    },
    leavePartsOnError: false,
  });

  return uploads;
}
