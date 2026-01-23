import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const bucketName = process.env.AWS_S3_BUCKET;

/**
 * Upload a file to S3
 * @param {string} filePath - Local path to the file
 * @param {string} folder - Optional folder name in S3
 * @returns {Promise<string>} - Public URL of the uploaded file
 */
export const uploadToS3 = async (filePath, folder = 'products') => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = `${folder}/${Date.now()}-${path.basename(filePath)}`;
    
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
        ContentType: getContentType(filePath)
    });

    await s3Client.send(command);
    
    // Return the public URL
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

/**
 * Delete a file from S3
 * @param {string} fileUrl - Full URL of the file to delete
 */
export const deleteFromS3 = async (fileUrl) => {
    try {
        // Extract the key from the URL
        const url = new URL(fileUrl);
        const key = url.pathname.substring(1); // Remove leading slash
        
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key
        });

        await s3Client.send(command);
    } catch (error) {
        console.log('Error deleting from S3:', error.message);
    }
};

/**
 * Get content type based on file extension
 */
const getContentType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    return types[ext] || 'application/octet-stream';
};

export default s3Client;
