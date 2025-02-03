import axios from "axios";
import { GrammarCheckResponse } from "../interfaces/grammar/grammar-check-response";
import { ResponseLanguageToolContainer } from "../interfaces/grammar/language-tool";

export class GrammarService {
  constructor() {}

  async grammarChecker(text: string): Promise<GrammarCheckResponse[]> {
    const textFormat = text.replace(/ /g, "%20");

    const matches = await axios.get(
      `${process.env.LANGUAGE_TOOL_BASE_URL}/check?language=en-US&text=${textFormat}`
    );

    // En la opcion matches
    let clientResponse: GrammarCheckResponse[] = [];
    const dataResponse: ResponseLanguageToolContainer = matches.data;
    for (const element of dataResponse.matches) {
      const initiWord = element.offset;
      const lastWord = initiWord + element.length;
      const responseModel = {
        sentence: text.substring(initiWord, lastWord),
        options: element.replacements,
      };
      clientResponse.push(responseModel);
    }

    return clientResponse;
  }
}
