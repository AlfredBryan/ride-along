import cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "ride-along",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 200, height: 200, crop: "limit" }]
});

const upload = multer({ storage }).single("image");

export default upload;
