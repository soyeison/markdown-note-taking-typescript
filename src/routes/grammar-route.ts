import express, { Request, Response } from "express";
import { GrammarService } from "../services/grammar-service";
import { LanguageToolService } from "../services/laguage-tool-service";

const router = express.Router();

router.post("/checker", async (req: Request, res: Response) => {
  const { fileName }: { fileName: string } = req.body;
  if (!fileName) {
    res.status(400).json({ error: "Por favor inserte un texto" });
  } else {
    const languageToolService = new LanguageToolService();
    const grammarService = new GrammarService(languageToolService);
    const processedText = await grammarService.grammarChecker(fileName);

    res.json({
      message: "Text parsed correctly",
      content: processedText,
    });
  }
});

export default router;
