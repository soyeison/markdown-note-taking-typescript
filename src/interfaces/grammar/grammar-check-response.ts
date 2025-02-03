import { Replacement } from "./language-tool";

export interface GrammarCheckResponse {
  sentence: string;
  options: Replacement[];
}
