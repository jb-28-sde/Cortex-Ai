// import fs from "fs";
import path from "path";

export const uploadToS3 = async (filename, buffer, contentType) => {
  try {
    // Uploads naam ka folder banayenge
    const uploadDir = path.join(process.cwd(), "uploads");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Buffer (file data) ko us folder me save karenge
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Seedha tumhari Agent Service ka public URL return karenge
    return `https://agent-service-smrg.onrender.com/uploads/${filename}`;
  } catch (error) {
    console.error("File save error:", error);
    throw error;
  }
};