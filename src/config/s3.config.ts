import { S3Client } from '@aws-sdk/client-s3';

const isLocal = process.env.NODE_ENV !== 'production';

//Just exporting the S3Client instance to be used in other parts of the application
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'S3RVER',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'S3RVER',
  },
  ...(isLocal && {
	endpoint: process.env.S3_ENDPOINT || 'http://127.0.0.1:9000', 
	forcePathStyle: true 
	}), // Use path-style URLs for local development
});