import express from "express";
import cors from "cors";
import { storage } from "./fileStorage.js";
import { combineAudios } from "./audioProcessing.js";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());

const upload = multer({ storage: storage });

app.post("/combine-audios", upload.array("audios", 2), (req, res) => {
  if (req.files.length !== 2) {
    return res.status(400).send("There must be two audios exactly.");
  }

  const filePaths = req.files.map((file) => file.path);
  const destinationPath = dirname(filePaths[0]);

  combineAudios(
    filePaths,
    destinationPath,
    (error, combinedFileName, fileListPath) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send("Error while combining audio files.");
      }

      res.sendFile(combinedFileName, (err) => {
        if (err) {
          console.error("Error sending file:", err);
        }
        // Clean up temp files and file list
        filePaths.forEach((filePath) => fs.unlink(filePath, () => {}));
        fs.unlink(fileListPath, () => {});
        fs.unlink(combinedFileName, () => {});
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
