"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_config_1 = require("../config/s3.config");
class S3Service {
    bucketName;
    constructor(bucketName = "videos") {
        this.bucketName = bucketName;
    }
    async uploadFile(bucketName, originalName, fileContent, mimeType) {
        const fileName = `${Date.now()}-${originalName}`;
        await s3_config_1.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
            ContentType: mimeType
        }));
        return fileName;
    }
}
exports.s3Service = new S3Service();
