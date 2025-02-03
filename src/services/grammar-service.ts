import fs from "fs/promises";
import axios from "axios";
import { marked } from "marked";
import { GrammarCheckResponse } from "../interfaces/grammar/grammar-check-response";
import { ResponseLanguageToolContainer } from "../interfaces/grammar/language-tool";
import { LanguageToolService } from "./laguage-tool-service";

export class GrammarService {
  constructor(private languageToolService: LanguageToolService) {}

  async grammarChecker(fileName: string) {
    const pathToMarkdownFile = `src/static/markdown/${fileName}`;
    const markdownFile = await fs.readFile(pathToMarkdownFile, "utf-8");

    const htmlContent = await marked(markdownFile);

    // Limpiar el HTML para extraer solo las palabras (puedes usar una expresión regular para eliminar las etiquetas HTML)
    const cleanedContent = htmlContent
      .replace(/<[^>]+>/g, "") // Eliminar etiquetas HTML
      .replace(/[^a-zA-Z0-9\s]/g, "") // Eliminar caracteres especiales (como puntos, comas, etc.)
      .replace(/\s{2,}/g, " ") // Reemplazar múltiples espacios por un solo espacio
      .replace(/\n+/g, " ")
      .trim(); // Eliminar espacios al inicio y final

    const textFormat = cleanedContent.replace(/ /g, "%20");

    const matches = await this.languageToolService.checkGrammar(textFormat);

    // En la opcion matches
    let clientResponse: GrammarCheckResponse[] = [];
    const dataResponse: ResponseLanguageToolContainer = matches.data;
    for (const element of dataResponse.matches) {
      const initiWord = element.offset;
      const lastWord = initiWord + element.length;
      const responseModel = {
        sentence: cleanedContent.substring(initiWord, lastWord),
        options: element.replacements,
      };
      clientResponse.push(responseModel);
    }

    return clientResponse;
  }
}
