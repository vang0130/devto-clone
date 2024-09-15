"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
// const client = new S3Client({ region: process.env.AWS_REGION });

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = await sharp(file)
  .jpeg({quality: 50})
  .resize(800, 400)
  .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg" || "image/png",
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return fileName;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

type UploadState = { status: string; message: string | null };

export async function uploadFile(
  state: UploadState,
  formData: FormData
): Promise<string | UploadState> {
  try {
    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);
    const imgUrl  = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`
    revalidatePath("/");
    // return { status: "success", message: "File has been uploaded." };
    return imgUrl;
// }
  } catch (error) {
    return { status: "error", message: "Failed to upload file." };
  }
}

