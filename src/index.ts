import "dotenv/config";
import express from "express";
import markdownService from "./services/markdown-service";
import grammarService from "./services/grammar-service";

export const app = express();

app.use(express.json());

app.use("/markdown", markdownService);
app.use("/grammar", grammarService);

app.listen(3000, () => {
  console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`);
});
