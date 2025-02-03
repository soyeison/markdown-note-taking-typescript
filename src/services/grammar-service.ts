import axios from "axios";
import express, { Request, Response } from "express";
import { ResponseLanguageToolContainer } from "../interfaces/grammar/language-tool";
import { GrammarCheckResponse } from "../interfaces/grammar/grammar-check-response";

const router = express.Router();

async function grammarChecker(text: string): Promise<GrammarCheckResponse[]> {
  const textFormat = text.replace(/ /g, "%20");

  const matches = await axios.get(
    `http://localhost:8010/v2/check?language=en-US&text=${textFormat}`
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

router.post("/checker", async (req: Request, res: Response) => {
  const { text }: { text: string } = req.body;
  if (!text) {
    res.status(400).json({ error: "Por favor inserte un texto" });
  }

  const processedText = await grammarChecker(text);

  res.json({
    message: "Text parsed correctly",
    content: processedText,
  });
});

export default router;
