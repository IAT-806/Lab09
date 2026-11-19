# Lab 09 — Your Own AI

In class we wrote `agent.js`: it builds a prompt from what you type, sends it to a model on OpenRouter with `fetch`, and shows the answer. In this lab you run the model **on your own computer** instead. It's free, it needs no key, and nothing you type leaves your laptop.

Then you build a small **AI app with a creative interaction**: something you play with, not just a question and an answer.

There are two ways to run the model. Pick one:

|                        | **Ollama** (recommended)                   | **WebLLM** (easier to set up)                       |
| ---------------------- | ------------------------------------------ | --------------------------------------------------- |
| Where the model runs   | an app on your computer                    | inside the browser tab                              |
| Install                | the Ollama app + one model                 | nothing                                             |
| Models                 | many, and bigger ones                      | a few small ones                                    |
| Works on GitHub Pages? | only for people who set up Ollama (step 5) | yes, for anyone with Chrome or Edge                 |
| First run              | download the model once in the terminal    | the page downloads the model (~1 GB) the first time |

Both give you the same `chat(prompt)` function, so you can switch by changing one line.

## 1. Set up

**Ollama:**

1. Download and install Ollama from [ollama.com/download](https://ollama.com/download). Open the app.
2. In a terminal, download a model:
   ```
   ollama pull gemma3:1b
   ```
   That's about 0.8 GB and runs on any laptop. With 16 GB of RAM or more, try `gemma3:4b` too (3.3 GB, smarter).
3. Talk to it in the terminal: `ollama run gemma3:1b`. Say hi. Type `/bye` to leave.
4. Open [http://localhost:11434](http://localhost:11434) in your browser. It should say **Ollama is running**.

**WebLLM:** nothing to install. You need Chrome or Edge on a laptop. Go to step 2.

## 2. Run the starter

```
starter/
├── index.html    two text boxes, a button, and a box for the answer
├── agent.js      your app: builds the prompt and shows the answer
├── ollama.js     chat(prompt) using Ollama
└── webllm.js     chat(prompt) using WebLLM
```

1. In your website repo, make a folder called `lab-09`.
2. On this repo's GitHub page, click **Code**, then **Download ZIP**. Unzip it and copy everything from `starter/` into `lab-09/`.
3. Open `lab-09/index.html` with Live Server.
4. Type a character and a place, and press **Send**. The first answer is slow while the model loads. After that it's faster.

To use **WebLLM** instead, in `index.html` comment out the `ollama.js` line and un-comment the `webllm.js` line:

```html
<!-- <script src="ollama.js"></script> -->
<script type="module" src="webllm.js"></script>
```

The first time, the answer box shows the download progress.

## 3. What changed from class

Open `ollama.js` next to the `agent.js` we wrote in class. The `chat()` function is almost the same. Only two things changed:

- `API_URL` is `http://localhost:11434/...`, which means **your own computer**.
- There's **no key**, so there's no `Authorization` header.

`MODEL` has to be a model you downloaded. If you pulled `gemma3:4b`, change it there. Type `ollama list` in a terminal to see yours.

`agent.js` is your app. It's the same pattern as in class: read the text boxes, put them in a prompt with `${...}`, `await chat(prompt)`, show the answer.

## 4. What to make

Make a small app where a language model is part of a **creative interaction**. Replace the story example with your own idea.

Your app has to:

- **Do more than show text.** The answer should change something: a p5 sketch, a character, the colours, a score, what happens next.
- Have a prompt **you designed**. It decides how your app feels, so take time on it. Try a few versions.
- Call the model **when something happens** (a click, a key), never in `draw()`. A model takes a second or more to answer.

Some ideas, if you need one:

- A creature in p5 that reads what you type and changes its color and speed.
- A fortune teller: ask a question, get a prophecy and a lucky color for the background.
- A text adventure: the model describes a room, you type what you do, it tells you what happens.
- A game where the model is the judge: two players type, it picks a winner and explains why.
- Your Ball sketch from Lab 05, where the model decides what color the balls should be.

Small models are a bit dumb and a bit strange. Design for that. Weird is good.

<details>
<summary><strong>Hint: using the answer in a p5 sketch</strong></summary>

Ask for an answer your code can use. Tell the model exactly what to send back:

```js
const prompt = `
What color is this feeling: ${feeling}
Answer with only one CSS color name, like "tomato" or "skyblue". Nothing else.
`;
let answer = await chat(prompt);
ballColor = answer.trim(); // trim() removes spaces and new lines around it
```

Then use `ballColor` in `draw()`, like any other variable. Add p5 to `index.html` the same way as in your other labs.

Small models don't always listen. If you get "The color is tomato." instead of "tomato", make the prompt stricter, or check the answer before you use it.

</details>

### Bonus

- Remember the conversation: keep earlier messages in the `messages` array, so the model remembers what you said.
- Mix it with ml5.js: turn what the webcam sees into words, then put them in your prompt.

## 5. Putting it on your website

Your page will be at `https://YOUR-USERNAME.github.io/...`. It loads from GitHub, but the model still runs on the visitor's own computer.

**With WebLLM:** it just works, for anyone with Chrome or Edge. The model downloads the first time they visit.

**With Ollama:** it works only on a computer that has Ollama running, with the same model, and that has said "I trust pages from github.io". By default, Ollama only answers pages on `localhost`. That's why Live Server works and GitHub Pages doesn't. To fix it on your computer:

**Mac**, in Terminal:

```
launchctl setenv OLLAMA_ORIGINS "https://*.github.io"
```

Then quit Ollama from the menu bar (the llama icon → **Quit Ollama**) and open it again. You have to run that line again after you restart your Mac.

**Windows**, in PowerShell:

```
setx OLLAMA_ORIGINS "https://*.github.io"
```

Then quit Ollama from the system tray (right-click the llama → **Quit**) and open it again. This one is permanent.

Then open your GitHub Pages link:

- Use **Chrome, Edge, or Firefox**. **Safari won't work**: it blocks GitHub Pages from talking to `localhost`.
- Chrome may ask to let the page **access other apps and services on this device**. Click **Allow**.

This lets any page on `github.io` use your Ollama while it's running. That's fine for this class. Quit Ollama when you don't need it.

Because most visitors won't have Ollama, your page also needs a **screenshot or short screen recording** of the app working, so people can see it without running it.

## How to hand it in

1. On `lab-09/index.html`, change the title and `<h1>` to your app's name, and under the app write:
   - which model you used, and whether you used Ollama or WebLLM,
   - your prompt,
   - two or three sentences: what the model did well, and what surprised you.
2. Add the screenshot or screen recording to the page.
3. Add a link to it on `projects/iat-806/index.html`.
4. Commit and sync, then open it on GitHub Pages.

In **Canvas**, submit:

1. The link to your live page.
2. The link to your `lab-09` folder in your GitHub repo.

Need a reminder on adding a folder to your site? See [section 4 of the personal-website README](https://github.com/IAT-806/personal-website#4-add-a-submission).

## If something doesn't work

Open the browser console (right-click the page → **Inspect** → **Console**) and read the red text.

- **`Failed to fetch`** with Live Server: the Ollama app isn't open. Open it, then check [http://localhost:11434](http://localhost:11434).
- **`Failed to fetch`** on GitHub Pages, and the console mentions **CORS**: you didn't set `OLLAMA_ORIGINS`, didn't restart Ollama after setting it, or you're in Safari. See step 5.
- **`model '...' not found`**: `MODEL` in `ollama.js` isn't a model you downloaded. Run `ollama list` to see yours, or `ollama pull gemma3:1b`.
- **`chat is not defined`**: the `<script>` line for `ollama.js` or `webllm.js` is missing, or both are commented out.
- **WebLLM says it can't find WebGPU**: use Chrome or Edge on a laptop, or use Ollama.
- **WebLLM is stuck loading, or the tab crashes**: the model is too big for your computer. Try `Llama-3.2-1B-Instruct-q4f16_1-MLC` in `webllm.js`.
- **It's very slow**: the first answer loads the model, so it's always slow. If every answer is slow, use a smaller model, and don't call `chat()` in `draw()`.
