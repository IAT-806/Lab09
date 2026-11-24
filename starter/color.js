// color.js
// Example 2: the answer changes a p5 sketch.
// Type a feeling. The model picks a color for it. The balls turn that color.

let balls = [];
let ballColor = "white"; // the model changes this

function setup() {
  createCanvas(600, 300);
  for (let i = 0; i < 100; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(30);
  for (let ball of balls) {
    ball.update();
  }
}

class Ball {
  constructor() {
    this.x = random(width);
    this.y = random(height);
  }

  update() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    noStroke();
    fill(ballColor);
    circle(this.x, this.y, 20);
  }
}

document.querySelector("#send").addEventListener("click", async () => {
  const feeling = document.querySelector("#feeling").value;
  const output = document.querySelector("#output");

  // Ask for exactly what your code needs: one color name, nothing else.
  const prompt = `
  What color is this feeling:
  ${feeling}
  Answer with only one CSS color name, like tomato or skyblue. Nothing else.
  `;

  output.textContent = "Thinking...";
  let answer = await chat(prompt);
  answer = answer.trim().toLowerCase(); // remove spaces and new lines around it
  output.textContent = answer;

  // Check the answer before you use it. p5 can't draw with "The color is blue."
  // CSS.supports() asks the browser: is this a real color?
  if (CSS.supports("color", answer)) {
    ballColor = answer;
  } else {
    output.textContent = answer + "\n(That's not a color, so the balls stay the same.)";
  }
});
