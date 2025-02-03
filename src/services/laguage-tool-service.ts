import axios from "axios";

export class LanguageToolService {
  async checkGrammar(text: string) {
    const matches = await axios.get(
      `${process.env.LANGUAGE_TOOL_BASE_URL}/check?language=en-US&text=${text}`
    );

    return matches;
  }
}
