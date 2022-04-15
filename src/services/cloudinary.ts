import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinaryImage = async (path: string) => {
  try {
    const upload = await cloudinary.v2.uploader.upload(path);
    return upload;
  } catch (error) {
    console.log(
      "🚀 ~ file: cloudinary.ts ~ line 14 ~ uploadCloudinaryImage ~ error",
      error
    );
  }
  return null
};
