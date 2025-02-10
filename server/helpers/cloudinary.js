import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "diytob6sj",
  api_key: "936132689856596",
  api_secret: "AZJocTJq1QC9UpAFxlISn2Vkppk",
});

const storage = new multer.memoryStorage();

export async function ImageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result
}

export const upload = multer({storage});


