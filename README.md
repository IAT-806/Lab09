# Lab 08 — Your Own AI

In Week 9 we called language models on OpenRouter, with an API key. In this lab you run a model **on your own computer**. It's free, it needs no key, and nothing you type leaves your laptop.

Then you build a small **AI app with a creative interaction**: something you play with, not just a chat box.

There are two ways to run the model. Pick one:

|                        | **Ollama** (recommended)                  | **WebLLM** (easier to set up)                  |
| ---------------------- | ----------------------------------------- | ---------------------------------------------- |
| Where the model runs   | an app on your computer                   | inside the browser tab                         |
| Install                | the Ollama app + one model                | nothing                                        |
| Models                 | many, and bigger ones                     | a few small ones                               |
| Works on GitHub Pages? | only for people who set up Ollama (step 5)| yes, for anyone with Chrome or Edge            |
| First run              | download the model once in the terminal   | the page downloads the model (~1 GB) the first time |

Both use the same three functions, so you can switch later by changing one line.

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

**WebLLM:** nothing to install. You need Chrome or Edge on a laptop (it uses your graphics card through WebGPU). Do step 2, then switch to WebLLM as shown there.

## 2. Run the starter

```
starter/
├── index.html    the page: model picker, text box, where the answer shows up
├── ollama.js     listModels(), ask(), askJSON() using Ollama
├── webllm.js     the same three functions using WebLLM
└── sketch.js     an example app: your words turn into weather
```

1. In your website repo, make a folder called `lab-08`.
2. On this repo's GitHub page, click **Code**, then **Download ZIP**. Unzip it and copy everything from `starter/` into `lab-08/`.
3. Open `lab-08/index.html` with Live Server. It should say **Ready**.
4. Type "a rainy monday" and press **Send**. The first answer is slow while the model loads. After that it's faster.

To use **WebLLM** instead, in `index.html` keep the `webllm.js` line and comment out the `ollama.js` line:

```html
<!-- <script src="ollama.js"></script> -->
<script type="module" src="webllm.js"></script>
```

The status line shows the download progress the first time.

## 3. How it works

Read `ollama.js`. It's the same request as `call.js` from [Week 9](https://github.com/IAT-806/in-class/tree/main/Week-9/api-call), with three changes: the URL is `http://localhost:11434` (your computer), there's no key, and the model names are Ollama's.

You have three functions:

- `listModels()` gives you the names of the models you can use.
- `ask(model, instructions, prompt)` gives you back text.
- `askJSON(model, instructions, prompt, shape)` gives you back **an object**, in the shape you ask for:

  ```js
  let answer = await askJSON(model, 'Describe the weather.', 'a rainy monday', {
    color: 'string',
    speed: 'number',
  });
  // answer is { color: "#5a6b7c", speed: 2 }, so you can use answer.speed in draw()
  ```

`askJSON()` is what makes the example creative: the model's answer **controls the sketch**. Read `respondTo()` in `sketch.js` to see it. The model picks colors and a speed, the sketch checks them, then the drops use them.

## 4. What to make

Make a small app where a language model is part of a **creative interaction**. Replace the weather example with your own idea.

Your app has to:

- **Do more than chat.** The model's answer should change something: the canvas, a character, a sound, the rules of a game, the layout of the page.
- Use `askJSON()` **at least once**, and use what comes back in your code.
- Have your own **instructions** (the system message). They decide how your app feels, so take time on them.
- Call the model **when something happens** (a click, a key, a finished drawing, every 10 seconds), never in `draw()`. Local models take a second or more to answer.

Some ideas, if you need one:

- A creature that reads what you type and reacts: `{ mood, speed, size, sound }`.
- A drawing partner that names your doodle and changes the colours to match.
- A fortune teller that turns a question into a shape, a color, and one line of prophecy.
- A text adventure where the model writes three choices, and each one becomes a button.
- Your Ball sketch from Lab 05, where the model decides how each ball behaves.
- A game where the model is the judge: two players type, it scores them and explains why.

Small models are a bit dumb and a bit strange. Design for that. Weird is good.

### Bonus

- Keep a conversation: send earlier messages back in `messages`, so the model remembers.
- Use what you learned with ml5.js: describe what the webcam sees as words, then ask the model about it.
- Try two different models on the same prompt and compare them on the page.

## 5. Putting it on your website

Your page will be at `https://YOUR-USERNAME.github.io/...`. It loads from GitHub, but the model still runs on the visitor's own computer.

**With WebLLM:** it just works, for anyone with Chrome or Edge. The model downloads the first time they visit.

**With Ollama:** it works only on a computer that has Ollama running, with the same model, and that has said "I trust pages from github.io". By default, Ollama only answers pages on `localhost`, which is why Live Server works and GitHub Pages doesn't. To fix it on your computer:

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

1. On `lab-08/index.html`, change the title and `<h1>` to your app's name, and under the app write:
   - which model you used (and Ollama or WebLLM),
   - your instructions (the system message),
   - two or three sentences: what the model did well, and what surprised you.
2. Add the screenshot or screen recording to the page.
3. Add a link to it on `projects/iat-806/index.html`.
4. Commit and sync, then open it on GitHub Pages.

In **Canvas**, submit:

1. The link to your live page.
2. The link to your `lab-08` folder in your GitHub repo.

Need a reminder on adding a folder to your site? See [section 4 of the personal-website README](https://github.com/IAT-806/personal-website#4-add-a-submission).

## If something doesn't work

Open the browser console (right-click the page → **Inspect** → **Console**) and read the red text.

- **"Can't reach Ollama"** with Live Server: the Ollama app isn't open. Open it, then check [http://localhost:11434](http://localhost:11434).
- **"Can't reach Ollama"** on GitHub Pages: you didn't set `OLLAMA_ORIGINS`, didn't restart Ollama after setting it, or you're in Safari. The console will mention **CORS**. See step 5.
- **"no models yet"**: run `ollama pull gemma3:1b` in a terminal, then reload the page.
- **"model '...' not found"**: the model name in your code isn't one you've pulled. Run `ollama list` to see yours.
- **"This browser has no WebGPU"**: WebLLM needs Chrome or Edge on a laptop. Switch browsers, or use Ollama.
- **WebLLM is stuck loading, or the tab crashes**: the model is too big for your graphics card. Pick a smaller one from the list.
- **It's very slow**: the first answer loads the model, so it's always slow. If every answer is slow, use a smaller model (`gemma3:1b`), and don't call the model in `draw()`.
- **`Unexpected token` from `JSON.parse`**: you called `ask()` and expected JSON. Use `askJSON()`.
- **The colors are wrong or the sketch stops drawing**: the model sent something p5 doesn't understand. Check every value before you use it, like `respondTo()` does.
