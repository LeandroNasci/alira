import mongoose, { Document, Schema } from "mongoose";
import aws from "aws-sdk";
import fs from "fs";
import path from "path";
import { promisify } from "util";

interface ImageDocument extends Document {
  key: string;
  url: String;
}

const s3 = new aws.S3();

const PostSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

PostSchema.pre("save", function (this: ImageDocument) {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre("remove", function (this: ImageDocument) {
  if (process.env.STORAGE_TYPE === "s3" ) {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key,
        }, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);
        }
      )
      .promise()
      .then((response: any) => {
        console.log(response.status);
      })
      .catch((response: any) => {
        console.log(response.status);
      });
  } else {
    console.log('acessou o delete local');

    return promisify(fs.unlink)(
      path.join(__dirname, "..", "..", "uploads", this.key)
    );
  }
});

const Post =  mongoose.model("Post", PostSchema);

export default Post;
