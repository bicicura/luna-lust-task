import fs from "fs";
import { dirname, join } from "path";
import { exec } from "child_process";

export function combineAudios(filePaths, destinationPath, callback) {
  const fileList = `filelist_${Date.now()}.txt`;
  const fileListPath = join(dirname(filePaths[0]), fileList);
  const combinedFileName = join(destinationPath, `combined_${Date.now()}.mp3`);

  fs.writeFileSync(
    fileListPath,
    filePaths.map((filePath) => `file '${filePath}'`).join("\n")
  );

  const command = `ffmpeg -f concat -safe 0 -i "${fileListPath}" -c:a libmp3lame -q:a 2 "${combinedFileName}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return callback(error);
    }
    callback(null, combinedFileName, fileListPath);
  });
}
