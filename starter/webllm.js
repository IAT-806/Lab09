// webllm.js
// The same three functions as ollama.js (listModels, ask, askJSON), but the model
// runs INSIDE THE BROWSER TAB with WebLLM. Nothing to install, and it works on GitHub Pages
// for anyone who opens your page.
// The catch: the first time, the browser downloads the model (about 0.5 to 1 GB).
// After that it's cached and loads in a few seconds.
//
// To use it, in index.html swap
//   <script src="ollama.js"></script>
// for
//   <script type="module" src="webllm.js"></script>

import * as webllm from 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.86/+esm';

// Small models that run on most laptops. The first one is the default.
// Full list: https://github.com/mlc-ai/web-llm/blob/main/src/config.ts (look for model_id)
const MODELS = [
  'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', // ~1 GB download, best at JSON
  'Llama-3.2-1B-Instruct-q4f16_1-MLC', // ~0.7 GB
  'Qwen2.5-0.5B-Instruct-q4f16_1-MLC', // ~0.4 GB, fast but not very smart
];

let engine = null;
let loadedModel = null;

// Download (first time) and start the model. Only when it's a different model than last time.
async function load(model) {
  if (model === loadedModel) return;
  let progress = (report) => showStatus(report.text, ''); // index.html
  if (engine) {
    await engine.reload(model);
  } else {
    engine = await webllm.CreateMLCEngine(model, { initProgressCallback: progress });
  }
  loadedModel = model;
  showStatus(`Model loaded: ${model}`, 'ok');
}

async function listModels() {
  if (!navigator.gpu) {
    throw new Error('This browser has no WebGPU, so WebLLM can\'t run here. Try Chrome or Edge on a laptop.');
  }
  return MODELS;
}

async function ask(model, instructions, prompt) {
  await load(model);
  let reply = await engine.chat.completions.create({
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: prompt },
    ],
  });
  return reply.choices[0].message.content;
}

async function askJSON(model, instructions, prompt, shape) {
  await load(model);
  let properties = {};
  for (let key in shape) {
    properties[key] = { type: shape[key] };
  }
  let schema = { type: 'object', properties: properties, required: Object.keys(shape) };

  let reply = await engine.chat.completions.create({
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: prompt },
    ],
    // WebLLM wants the schema as a string. (Ollama wants it as an object. Small differences!)
    response_format: { type: 'json_object', schema: JSON.stringify(schema) },
  });
  return JSON.parse(reply.choices[0].message.content);
}

// A module's functions are private. Put them on `window` so sketch.js and index.html can call them.
window.listModels = listModels;
window.ask = ask;
window.askJSON = askJSON;
