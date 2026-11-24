// adventure.js
// Example 3: the model remembers.
// A model forgets everything between calls. So we keep the whole story in a variable,
// and send all of it every time.

let story = "You wake up in a small boat. It's night. Music is coming from under the water.";
document.querySelector("#output").textContent = story;

document.querySelector("#send").addEventListener("click", async () => {
  const action = document.querySelector("#action").value;
  const output = document.querySelector("#output");

  const prompt = `
  You are the narrator of a strange text adventure.
  Here is the story so far:
  ${story}
  The player does this:
  ${action}
  Write what happens next in two or three sentences. Only write the story.
  `;

  output.textContent = story + "\n\nThinking...";
  let next = await chat(prompt);

  // Add the player's move and the answer to the story, so the model gets them next time.
  story = story + "\n\n> " + action + "\n\n" + next;
  output.textContent = story;
  document.querySelector("#action").value = "";
});
