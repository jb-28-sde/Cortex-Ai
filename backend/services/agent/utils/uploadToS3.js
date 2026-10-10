// import fs from "fs";
import path from "path";

export const uploadToS3 = async (filename, buffer, contentType) => {
  try {
    const uploadDir = path.join(process.cwd(), "uploads");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Ye seedha tumhare render ka public URL dega
    return `https://agent-service-smrg.onrender.com/uploads/${filename}`;
  } catch (error) {
    console.error("Local save error:", error);
    throw error;
  }
};