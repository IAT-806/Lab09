// agent.js
// Your app. Right now it writes a tiny story. Change it into your own idea.

document.querySelector("#send").addEventListener("click", async () => {
  const character = document.querySelector("#character").value;
  const place = document.querySelector("#place").value;
  const output = document.querySelector("#output");

  const prompt = `
  You write very short stories. Write a story in three sentences.
  The main character is:
  ${character}
  and the story happens in:
  ${place}
  Only write the story, nothing else.
  `;

  output.textContent = "Thinking... (the first time is slow while the model loads)";
  let story = await chat(prompt); // chat() is in ollama.js or webllm.js
  output.textContent = story;
});
