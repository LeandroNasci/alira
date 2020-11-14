import { Express, Request } from 'express';
import multer from 'multer';
import path from 'path';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

export interface File extends Express.Multer.File {
  location: string;
  key: string;
}

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.join(__dirname, "..", "..", "uploads"));
    },
    filename: (request, file: File, callback) => {
      file.key = `${Date.now()}-${file.originalname}`;

      callback(null, file.key);
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME || "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (request, file: File, callback) => {
      file.key = `${Date.now()}-${file.originalname}`;

      callback(null, file.key);
    },
  }),
};


export default {
  dest: path.join(__dirname, "..", "..", "uploads"),
  storage: storageTypes["s3"],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (request: Request, file: File, callback: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type."));
    }
  },
}
