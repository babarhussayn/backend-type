import { v2 as cloudinary } from "cloudinary";

export async function uploadFile(file: Express.Multer.File): Promise<any> {
  // Ensure the Cloudinary configuration is set up
  cloudinary.config({
    cloud_name: "drxwjovez",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Return a Promise for the Cloudinary upload
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        console.error("Error during upload:", error);
        return reject(error);
      }
      resolve(result);
    });

    // Ensure the file buffer is piped to the uploadStream
    if (file?.buffer) {
      uploadStream.end(file.buffer);
    } else {
      reject(new Error("File buffer is missing."));
    }
  });
}
