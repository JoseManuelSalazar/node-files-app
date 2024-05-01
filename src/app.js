import fs from "node:fs/promises";
import path from "node:path";
import pc from "picocolors";
import getFolderSize from "get-folder-size";

const NO_SUCH_DIRECTORY_ERROR_CODE = "ENOENT";

function getFilesDataPromises(folder, files) {
  return files.map(async (file) => {
    const filePath = path.join(folder, file);
    let fileStats;
    try {
      fileStats = await fs.stat(filePath);
    } catch (error) {
      const errorMessage = pc.red("An error has occurred:");
      console.log(errorMessage, error);
      process.exit(1);
    }
    const KB = 1024;
    const MB = KB * KB;
    const GB = MB * KB;
    const DECIMALS = 2;
    const type = fileStats.isDirectory() ? "d" : "f";
    const name = `${file}${fileStats.isDirectory() ? path.sep : ""}`;
    let size = fileStats.isDirectory()
      ? await getFolderSize.loose(filePath)
      : fileStats.size;
    if (size >= GB) {
      size = `${(size / GB).toFixed(DECIMALS)} GB`;
    } else if (size >= MB) {
      size = `${(size / MB).toFixed(DECIMALS)} MB`;
    } else {
      size = `${(size / KB).toFixed(DECIMALS)} KB`;
    }
    const lastModifiedTime = fileStats.mtime.toLocaleString();
    return { type, name, size, lastModifiedTime };
  });
}

function printFilesData(files) {
  let maxNameLength = 4;
  let maxSizeLength = 0;
  files.forEach((file) => {
    maxNameLength = Math.max(maxNameLength, file.name.length);
    maxSizeLength = Math.max(maxSizeLength, file.size.length);
  });

  const hName = pc.bold("Name".padEnd(maxNameLength));
  const hSize = pc.bold("Size".padEnd(maxSizeLength));
  const hLastModifiedTime = pc.bold("Last modified time");
  const header = `   ${hName}  ${hSize}  ${hLastModifiedTime}`;
  console.log(header);

  files.forEach((file) => {
    const type = file.type === "d" ? pc.red(file.type) : pc.white(file.type);
    const name = pc.blue(file.name.padEnd(maxNameLength));
    const size = pc.yellow(file.size.padStart(maxSizeLength));
    const lastModifiedTime = pc.green(file.lastModifiedTime);
    const message = `${type}  ${name}  ${size}  ${lastModifiedTime}`;
    console.log(message);
  });

  const totalElements = pc.cyan(pc.underline(`${files.length} elements`));
  console.log(totalElements);
}

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    if (error.code === NO_SUCH_DIRECTORY_ERROR_CODE) {
      const errorMessage = pc.red("The specified directory does not exist.");
      console.log(errorMessage);
    } else {
      const errorMessage = pc.red("An error has occurred:");
      console.log(errorMessage, error);
    }
    process.exit(1);
  }

  const filesPromises = getFilesDataPromises(folder, files);
  const filesData = await Promise.all(filesPromises);
  printFilesData(filesData);
}

const PATH_ARG_INDEX = 2;
const folder = process.argv[PATH_ARG_INDEX] ?? ".";

ls(folder);
