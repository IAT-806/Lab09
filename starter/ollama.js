// ollama.js
// Talk to a language model running on YOUR computer, with Ollama.
//
// This is the same request we sent to OpenRouter in Week 9. Only three things change:
//   1. the URL is your own computer (localhost), not openrouter.ai
//   2. there is no API key: nobody bills you, and nothing leaves your laptop
//   3. the model names are Ollama's, like "gemma3:1b"

const OLLAMA_URL = 'http://localhost:11434';

// Which models have you downloaded? (the ones `ollama list` shows)
// If this fails, the page can't reach Ollama at all.
async function listModels() {
  let response;
  try {
    response = await fetch(`${OLLAMA_URL}/api/tags`);
  } catch {
    throw new Error("Can't reach Ollama. Start the Ollama app. On GitHub Pages, see step 5 of the Lab 08 README.");
  }
  let data = await response.json();
  let names = data.models.map((m) => m.name);
  names = names.filter((name) => !name.includes('embed')); // embedding models can't chat
  if (names.length === 0) {
    throw new Error('Ollama is running, but you have no models yet. In a terminal: ollama pull gemma3:1b');
  }
  return names;
}

// One call: instructions (the system message) + prompt (the user message) -> text.
async function ask(model, instructions, prompt) {
  let request = {
    model: model,
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: prompt },
    ],
  };
  let data = await send(request);
  return data.choices[0].message.content;
}

// Same call, but the answer has to be JSON in the shape you describe.
// Ollama forces the model to follow `shape`, so you get an object you can use in code:
//   askJSON(model, instructions, 'a rainy monday', { color: 'string', speed: 'number' })
//   -> { color: "#5a6b7c", speed: 2 }
async function askJSON(model, instructions, prompt, shape) {
  let properties = {};
  for (let key in shape) {
    properties[key] = { type: shape[key] };
  }

  let request = {
    model: model,
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: prompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'answer',
        schema: { type: 'object', properties: properties, required: Object.keys(shape) },
      },
    },
  };
  let data = await send(request);
  return JSON.parse(data.choices[0].message.content);
}

// Send a request and return the JSON that comes back, or throw a readable error.
async function send(request) {
  let response;
  try {
    response = await fetch(`${OLLAMA_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
  } catch {
    // fetch() only throws when it got no answer at all.
    throw new Error("Can't reach Ollama. Is it running? See the README if this page is on GitHub Pages.");
  }

  let data = await response.json();
  if (data.error) throw new Error(data.error.message); // e.g. "model 'x' not found"
  return data;
}
