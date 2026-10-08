import { Router, Request, Response } from 'express';
import { uploadMemory } from '../middleware/upload.middleware';
import {s3Service} from '../services/s3.service';

const router = Router();

// Callstack for the upload middleware
const uploadPipeline = [
  uploadMemory.single('video')
];

router.post('/upload', uploadPipeline, async (req: Request, res: Response) => {

	try{
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		
	// Upload the file to S3
	const fileName = await s3Service.uploadFile('videos', req.file.originalname, req.file.buffer, req.file.mimetype);
	
	// Return the S3 file name in the response
	return res.status(200).json({ message: 'File uploaded successfully', fileName });
	
	}catch(err){
		return res.status(500).json({ error: 'Error processing the file upload' });
	}
});

export default router;