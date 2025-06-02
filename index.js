import express from "express";
import cors from 'cors';
import OpenAI from "openai";

const app = express();
const port = 3000;
const openai = new OpenAI();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      });
      res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
      console.error("OpenAI error:", error);
      res.status(500).json({ error: "Failed to get response from OpenAI" });
    }
  });
  

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
