// ollama.js
// chat(prompt) using Ollama. The model runs on YOUR computer.
// It's the chat() from class with two changes:
//   1. the URL is your own computer (localhost), not openrouter.ai
//   2. there is no key: it's free, and nothing you type leaves your laptop

const API_URL = "http://localhost:11434/v1/chat/completions";
const MODEL = "gemma3:1b"; // a model you downloaded with `ollama pull`

async function chat(prompt) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || response.statusText);
  return data.choices[0].message.content;
}
