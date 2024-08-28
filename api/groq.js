const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

module.exports = async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [{ role: "user", content: message }],
      "model": "llama-3.1-8b-instant",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false
    });

    res.status(200).json({ response: chatCompletion.choices[0]?.message?.content || 'No response' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing your request' });
  }
};

