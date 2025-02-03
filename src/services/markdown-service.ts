import fs from "fs/promises";
import { marked } from "marked";

export class MarkdownService {
  async getAllFilesUploaded() {
    const pathToMarkdownFolder = "src/static/markdown/";
    const files = await fs.readdir(pathToMarkdownFolder);

    if (files.length === 0) {
      return null;
    }

    return files;
  }

  async convertToHTML(fileName: string) {
    const pathToMarkdownFile = `src/static/markdown/${fileName}`;
    const markdownFile = await fs.readFile(pathToMarkdownFile, "utf-8");

    if (!markdownFile) {
      return null;
    }

    const htmlOutput = marked(markdownFile);

    return htmlOutput;
  }
}
