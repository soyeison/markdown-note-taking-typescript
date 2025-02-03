import "dotenv/config";
import express, { Request, Response } from "express";
import markdownService from "./routes/markdown-route";
import grammarService from "./routes/grammar-route";

export const app = express();

app.use(express.json());

app.use("/markdown", markdownService);
app.use("/grammar", grammarService);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(400).send({ data: null, message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`);
});
