import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

export function generateRandomName() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const audiosDirPath = join(
      dirname(fileURLToPath(import.meta.url)),
      "audios"
    );
    fs.mkdirSync(audiosDirPath, { recursive: true });
    cb(null, audiosDirPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${generateRandomName()}.mp3`);
  },
});
