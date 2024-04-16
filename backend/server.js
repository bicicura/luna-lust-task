import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { exec } from "child_process";

const app = express();
const port = 3000;

app.use(cors());

// Multer config for storing audio files in fs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // storing the tmp audio files in 'audios' dir!
    cb(null, join(dirname(fileURLToPath(import.meta.url)), "audios"));
  },
  filename: function (req, file, cb) {
    // random generated name
    cb(null, `${file.fieldname}_${Date.now()}.mp3`);
  },
});

const upload = multer({ storage: storage });

app.post("/combine-audios", upload.array("audios", 2), (req, res) => {
  if (req.files.length !== 2) {
    return res
      .status(400)
      .send("Se requieren exactamente dos archivos de audio.");
  }

  const tempFileName1 = req.files[0].path;
  const tempFileName2 = req.files[1].path;

  // Creating .txt file, needed for the method we use with ffmpeg
  const fileList = `filelist_${Date.now()}.txt`;
  const fileListPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "audios",
    fileList
  );
  const combinedFileName = join(
    dirname(fileURLToPath(import.meta.url)),
    "audios",
    `combined_${Date.now()}.mp3`
  );

  fs.writeFileSync(
    fileListPath,
    `file '${tempFileName1}'\nfile '${tempFileName2}'`
  );

  // cmd used for concatenating the files with ffmpeg
  const command = `ffmpeg -f concat -safe 0 -i "${fileListPath}" -c:a libmp3lame -q:a 2 "${combinedFileName}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send("Error al combinar archivos de audio.");
    }

    // Sending combined file to client
    res.sendFile(combinedFileName, (err) => {
      // cleaning tmp files and .txt file list Limpiar archivos temporales y el archivo de lista
      fs.unlink(tempFileName1, () => {});
      fs.unlink(tempFileName2, () => {});
      fs.unlink(fileListPath, () => {});
      fs.unlink(combinedFileName, () => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
