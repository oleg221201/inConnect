import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { awsConfig } from '~config/aws.config';

const config = awsConfig();

const s3Client = new S3Client({ region: config.region });

export const generateUploadUrl = async (
  fileName: string,
  mime: string,
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: fileName,
    ContentType: `image/${mime.toLowerCase()}`,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300, // 5 min
    });
    return signedUrl;
  } catch (err) {
    throw err;
  }
};
