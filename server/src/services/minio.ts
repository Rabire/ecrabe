import { FileUpload } from "graphql-upload/Upload";
import * as Minio from "minio";
import path from "path";
import { getMimeType } from "stream-mime-type";
import { v4 as uuidv4 } from "uuid";
import {
  MINIO_ACCESS_KEY,
  MINIO_BUCKET,
  MINIO_SECRET_KEY,
} from "../helpers/env-variables";

class ExtendedMinioClient extends Minio.Client {
  constructor() {
    super({
      endPoint: "minio",
      port: 9000,
      useSSL: false,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  }

  async saveFile(options: {
    file: FileUpload;
    allowedMimes: string[];
    fileId?: string;
  }) {
    try {
      const { file, allowedMimes, fileId } = options;

      const { createReadStream, encoding, filename } = await file;

      const { mime } = await getMimeType(createReadStream());

      if (!allowedMimes.includes(mime))
        throw new Error("Invalid file type " + mime);

      const ext = path.extname(filename);

      const name = `${fileId || uuidv4()}${ext}`;

      await this.putObject(MINIO_BUCKET, name, createReadStream(), undefined, {
        "Content-Type": mime,
        "Content-Encoding": encoding,
      });

      return name;
    } catch (error) {
      console.log({ error });

      throw new Error("Error while uploading file : " + error);
    }
  }

  async getFileUrl(path: string) {
    const fileUrl = await this.presignedGetObject(MINIO_BUCKET, path, 86400); // 24h

    if (!fileUrl) throw new Error("Error processing file url.");

    return fileUrl;
  }
}

export default ExtendedMinioClient;
