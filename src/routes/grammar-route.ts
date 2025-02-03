import express, { Request, Response } from "express";
import { GrammarService } from "../services/grammar-service";

const router = express.Router();

router.post("/checker", async (req: Request, res: Response) => {
  const { text }: { text: string } = req.body;
  if (!text) {
    res.status(400).json({ error: "Por favor inserte un texto" });
  } else {
    const grammarService = new GrammarService();
    const processedText = await grammarService.grammarChecker(text);

    res.json({
      message: "Text parsed correctly",
      content: processedText,
    });
  }
});

export default router;
