import fs from "fs/promises";

export class MarkdownService {
  constructor() {}

  async getAllFilesUploaded() {
    const pathToMarkdownFolder = "src/static/markdown/";
    const files = await fs.readdir(pathToMarkdownFolder);

    console.log("Files: ", files);

    if (files.length === 0) {
      return null;
    }

    return files;
  }
}
