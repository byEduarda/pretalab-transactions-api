import { geminiInternal } from "../adapters/gemini";
import { chat } from "./gemini";
import dotenv from "dotenv";
dotenv.config();

const context: any[] = [];

export const ai = async (prompt: string) => {
  const input = {
    role: "user",
    parts: [
      {
        text: prompt,
      },
    ],
  };

  context.push(input);

  const data = await chat(prompt);

  const { response } = geminiInternal(data);

  const output = {
    role: "model",
    parts: [
      {
        text: response,
      },
    ],
  };

  context.push(output);

  console.log(context);
  console.log(response);

  return response;
};
