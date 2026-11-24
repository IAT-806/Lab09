// story.js
// Example 1: the same pattern as agent.js from class.
// Two text boxes go into the prompt. The answer is a tiny story.

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

  output.textContent = "Thinking...";
  let story = await chat(prompt);
  output.textContent = story;
});
