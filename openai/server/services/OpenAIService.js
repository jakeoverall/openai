import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});

export const openai = new OpenAIApi(configuration);
