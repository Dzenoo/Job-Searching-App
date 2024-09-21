import { fromEnv } from "@aws-sdk/credential-providers";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

// AWS S3 Configuration
const s3Client = new S3Client({
  credentials: fromEnv(),
  region: "eu-north-1",
});

async function deleteFileFromS3<T extends string>(
  fileName: T,
  folderName: string
): Promise<void> {
  const deleteParams = {
    Bucket: "job-searching-application",
    Key: `${folderName}/${fileName}`,
  };

  try {
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3Client.send(deleteCommand);
    console.log(`Successfully deleted file: ${fileName}`);
  } catch (error) {
    console.error(`Failed to delete file: ${fileName}`, error);
  }
}

async function uploadFileToS3<T extends string>(
  file: Express.Multer.File,
  fileName: T,
  folderName: string
): Promise<Upload> {
  const fileBuffer = Buffer.from(file.buffer);

  const uploadParams = {
    Bucket: "job-searching-application",
    Key: `${folderName}/${fileName}`,
    Body: fileBuffer,
  };

  const uploadInstance = new Upload({
    client: s3Client,
    params: uploadParams,
    leavePartsOnError: false,
  });

  return uploadInstance;
}

export { deleteFileFromS3, uploadFileToS3 };
