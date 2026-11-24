// webllm.js
// chat(prompt) using WebLLM. The model runs INSIDE THE BROWSER TAB.
// Nothing to install, and it works on GitHub Pages for anyone who opens your page.
// The catch: the first time, the browser downloads the model (about 1 GB).
// After that it's saved, and it starts in a few seconds.
//
// You don't need to understand the `import` and `window` lines. They load WebLLM.

import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.86/+esm";

// Other models: https://github.com/mlc-ai/web-llm/blob/main/src/config.ts (look for model_id)
// Smaller and faster, but less smart: "Llama-3.2-1B-Instruct-q4f16_1-MLC"
const MODEL = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

let engine = null; // the model, once it's loaded

async function chat(prompt) {
  // The first time: download and start the model, and show how far along it is.
  if (engine === null) {
    engine = await webllm.CreateMLCEngine(MODEL, {
      initProgressCallback: (report) => {
        document.querySelector("#output").textContent = report.text;
      },
    });
  }

  const reply = await engine.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
  });
  return reply.choices[0].message.content;
}

window.chat = chat; // so your app's .js file can use chat()
