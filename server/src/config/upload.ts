import { request } from 'express';
import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}_${file.originalname}`;

      callback(null, fileName);
    },
  }),
  upload: multer({
    fileFilter: (request, file, callback) => {
      const extension = path.extname(file.originalname);
        if(extension !== '.png' && extension !== '.jpg' && extension !== '.gif' && extension !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true);
    },
    limits:{
      fileSize: 1024 * 1024 //bytes
    }
  })
}
