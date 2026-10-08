"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = require("../middleware/upload.middleware");
const s3_service_1 = require("../services/s3.service");
const router = (0, express_1.Router)();
// Callstack for the upload middleware
const uploadPipeline = [
    upload_middleware_1.uploadMemory.single('video')
];
router.post('/upload', uploadPipeline, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Upload the file to S3
        const fileName = await s3_service_1.s3Service.uploadFile('videos', req.file.originalname, req.file.buffer, req.file.mimetype);
        // Return the S3 file name in the response
        return res.status(200).json({ message: 'File uploaded successfully', fileName });
    }
    catch (err) {
        return res.status(500).json({ error: 'Error processing the file upload' });
    }
});
exports.default = router;
