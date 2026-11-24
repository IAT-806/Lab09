# Lab 09 — A Creative AI App

In class we wrote `agent.js`. It reads what you type, puts it in a prompt, sends it to a model on OpenRouter with `fetch`, and shows the answer.

In this lab you build on top of that. You make a small **creative app with a language model**: something people play with, not just a question and an answer. You also try running the model in a new way.

## Three ways to run the model

The starter has three files. Each one has the same `chat(prompt)` function from class. Your app calls `chat()`, and it doesn't matter which file it comes from.

| File            | Where the model runs                     | What you need                                                |
| --------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `openrouter.js` | on OpenRouter's computers (like in class) | your OpenRouter key                                          |
| `ollama.js`     | on your computer, in the Ollama app      | install Ollama and download a model                          |
| `webllm.js`     | inside the browser tab                   | Chrome or Edge. The first time, the page downloads the model (about 1 GB) |

Build with whichever one you like. But **try Ollama or WebLLM at least once**, even if you end up using OpenRouter.

To switch, keep one of these three lines in your HTML file and comment out the other two:

```html
<script src="openrouter.js"></script>
<!-- <script src="ollama.js"></script> -->
<!-- <script type="module" src="webllm.js"></script> -->
```

### OpenRouter

Use the same key as in class. Paste it in the key box on the page. Never type it into your code: your site is on GitHub.

### Ollama

1. Download and install Ollama from [ollama.com/download](https://ollama.com/download). Open the app.
2. In a terminal, download a model:
   ```
   ollama pull gemma3:1b
   ```
   That's about 0.8 GB and runs on any laptop. If you have 16 GB of RAM or more, try `gemma3:4b` too. It's smarter.
3. Talk to it in the terminal: `ollama run gemma3:1b`. Say hi. Type `/bye` to leave.
4. Open [http://localhost:11434](http://localhost:11434) in your browser. It should say **Ollama is running**.

Open `ollama.js` next to your `agent.js` from class. Only two things changed: the URL is `localhost`, which means **your own computer**, and there's **no key**. If you downloaded a different model, change `MODEL`.

### WebLLM

Nothing to install. The first time you press Send, the page downloads the model and shows the progress. After that it's saved, and it starts in a few seconds.

## Set up

1. In your website repo, make a folder called `lab-09`.
2. On this repo's GitHub page, click the green **Code** button, then **Download ZIP**. Unzip it.
3. Copy everything from `starter/` into `lab-09/`:

```
starter/
├── index.html        a list of the examples (replace it with your app)
├── story.html        example 1
├── story.js
├── color.html        example 2
├── color.js
├── adventure.html    example 3
├── adventure.js
├── style.css         the same simple style as in class
├── openrouter.js     chat(prompt), three ways
├── ollama.js
└── webllm.js
```

4. Open `lab-09/index.html` with Live Server. Click **Story**. Paste your key, fill in the boxes, and press **Send**.

**Check:** you get a short story.

## The examples

Read each `.js` file. They're short.

1. **Story** (`story.js`): the same pattern as `agent.js` from class. Two text boxes go into the prompt.
2. **Color** (`color.js`): the answer changes a p5 sketch. The prompt asks for only one color name. The code checks that it's a real color, then the balls use it in `draw()`.
3. **Adventure** (`adventure.js`): the model remembers. A model forgets everything between calls, so we keep the whole story in a variable and send all of it every time.

Try each example with a different way of running the model. Notice what changes.

## What to make

Make a small app where a language model is part of a **creative interaction**. Start from one of the examples, or from scratch.

Your app has to:

- Use `chat()` from one of the three files.
- **Do more than show the answer.** The answer should change something: a sketch, the colors, a score, what happens next.
- Have a prompt **you wrote yourself**.

Some ideas, if you need one:

- A creature in p5 that reads what you type, and changes its color and speed.
- A fortune teller: ask a question, get a prophecy and a lucky color for the background.
- A game where the model is the judge: two players type, it picks a winner and says why.
- Your Ball sketch from Lab 05, where the model decides how the balls behave.
- A poem that grows: you write a line, the model writes the next one.

## Guidelines

- **Start small.** Get one example working first. Then change one thing at a time.
- **Write the prompt like instructions to a person.** Say who the model is, what it gets, and what to send back.
- **Ask for answers your code can use.** "Answer with only one word" is easier to use than a paragraph.
- **Check the answer before you use it.** Models don't always listen, and small ones listen less. See how `color.js` does it.
- **Call the model when something happens**: a click, a key. Never in `draw()`. An answer takes a second or more.
- **Keep your key out of your code.** Use the key box.
- **Try a few prompts.** Changing a few words can change the whole app. Keep notes on what you tried.

Weird is good. Have fun with it.

### Bonus

- Show the same prompt answered two ways, for example OpenRouter and Ollama, side by side.
- Mix it with ml5.js: turn what the webcam sees into words, and put them in your prompt.

## Putting it on your website

Your page loads from GitHub, but the model runs somewhere else. That changes who can use it:

- **OpenRouter:** works for anyone who pastes their own key.
- **WebLLM:** works for anyone with Chrome or Edge. The model downloads the first time.
- **Ollama:** works only on a computer that has Ollama running, with the same model. And Ollama only answers pages on `localhost` unless you tell it otherwise. That's why Live Server works and GitHub Pages doesn't.

To use Ollama from your GitHub Pages site on your own computer:

**Mac**, in Terminal:

```
launchctl setenv OLLAMA_ORIGINS "https://*.github.io"
```

Then quit Ollama from the menu bar (the llama icon → **Quit Ollama**) and open it again. You have to do this again after you restart your Mac.

**Windows**, in PowerShell:

```
setx OLLAMA_ORIGINS "https://*.github.io"
```

Then quit Ollama from the system tray (right-click the llama → **Quit**) and open it again.

Then:

- Use **Chrome, Edge, or Firefox**. **Safari won't work.** It blocks GitHub Pages from talking to `localhost`.
- If Chrome asks to let the page **access other apps and services on this device**, click **Allow**.
- Quit Ollama when you don't need it. This setting lets any page on `github.io` use it while it's running.

If you use Ollama, add a **screenshot or short screen recording** of your app working, so people can see it without running it.

## How to hand it in

1. Put your app in `lab-09/index.html`. You can keep the examples or delete them.
2. Change the title and the `<h1>` to your app's name. Under the app, write:
   - which way you ran the model (OpenRouter, Ollama, or WebLLM) and which model,
   - your prompt,
   - two or three sentences: what worked, what surprised you, and how Ollama or WebLLM felt compared to OpenRouter.
3. Add a link to it on `projects/iat-806/index.html`.
4. Commit and sync, then check that it works on GitHub Pages.

In **Canvas**, submit:

1. The link to your live page.
2. The link to your `lab-09` folder in your GitHub repo.

Need a reminder on adding a folder to your site? See [section 4 of the personal-website README](https://github.com/IAT-806/personal-website#4-add-a-submission).

## If something doesn't work

Open the browser console (right-click the page → **Inspect** → **Console**) and read the red text.

- **`chat is not defined`**: the `<script>` line for `openrouter.js`, `ollama.js`, or `webllm.js` is missing, or all three are commented out. It has to come **before** your own `.js` file.
- **`Cannot read properties of null (reading 'value')`** with OpenRouter: your page has no key box. Copy the `<input id="key" ...>` line from an example.
- **`No API key in the Authorization header`** or **`Missing Authentication header`**: the OpenRouter key box is empty, or the key is wrong. Paste it again.
- **`429`** or **`Provider returned error`**: the free OpenRouter model is busy. Wait a minute, or change `MODEL` in `openrouter.js`.
- **`Failed to fetch`** with Ollama on Live Server: the Ollama app isn't open. Open it, then check [http://localhost:11434](http://localhost:11434).
- **`Failed to fetch`** with Ollama on GitHub Pages, and the console mentions **CORS**: see [Putting it on your website](#putting-it-on-your-website).
- **`model '...' not found`**: `MODEL` in `ollama.js` isn't a model you downloaded. Run `ollama list` to see yours.
- **WebLLM can't find WebGPU**: use Chrome or Edge on a laptop.
- **WebLLM is stuck loading, or the tab crashes**: the model is too big for your computer. Try `Llama-3.2-1B-Instruct-q4f16_1-MLC` in `webllm.js`.
- **It's very slow**: the first answer is always slow while the model loads. If every answer is slow, use a smaller model, and don't call `chat()` in `draw()`.
