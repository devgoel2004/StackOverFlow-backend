import dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatbotController = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something Went Wrong");
  }
};
