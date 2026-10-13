import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/s3.config';

class S3Service {

	private bucketName: string;

	constructor(bucketName: string="videos") {
		this.bucketName = bucketName;
	}

  	async uploadFile(bucketName: string, originalName: string, fileContent: Buffer, mimeType: string): Promise<string> {
  		
		const fileName = `${Date.now()}-${originalName}`;
		
		await s3Client.send(new PutObjectCommand({
  			Bucket: bucketName,
  			Key: fileName,
  			Body: fileContent,
  			ContentType: mimeType
  		}));

		return fileName;
	}
}	

export const s3Service = new S3Service();