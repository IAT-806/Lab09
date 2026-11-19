// sketch.js
// An example of an AI app that does more than chat:
// you type a few words, the model answers with JSON, and the JSON changes the canvas.
// Replace all of this with your own idea.

// How the model should behave. Changing this changes your whole app.
const INSTRUCTIONS = `You turn a few words into the weather of a small world.
Pick colors as hex codes like "#1e3a5f". speed goes from 0 (still) to 10 (storm).
size goes from 4 (dust) to 60 (big drops). word is one word that sums up the mood.`;

// What we want back, and the type of each thing.
const SHAPE = {
  sky: 'string',
  color: 'string',
  speed: 'number',
  size: 'number',
  word: 'string',
};

// The world right now. The model's answer replaces it.
let weather = { sky: '#20242c', color: '#ffffff', speed: 2, size: 10, word: 'waiting' };
let drops = [];

function setup() {
  createCanvas(600, 400).parent('stage');
  for (let i = 0; i < 200; i++) {
    drops.push(new Drop());
  }
}

function draw() {
  background(weather.sky);
  for (let drop of drops) {
    drop.update();
  }

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(48);
  text(weather.word, width / 2, height / 2);
}

// Called from index.html when you press Send.
async function respondTo(words, model) {
  let answer = await askJSON(model, INSTRUCTIONS, words, SHAPE); // ollama.js

  // Never trust what the model sends: check it before you draw with it.
  if (!CSS.supports('color', answer.sky)) answer.sky = '#20242c';
  if (!CSS.supports('color', answer.color)) answer.color = '#ffffff';
  answer.speed = constrain(answer.speed, 0, 10);
  answer.size = constrain(answer.size, 4, 60);

  weather = answer;
  return answer;
}

class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(height);
  }

  update() {
    this.y += weather.speed + random(-1, 1);
    this.x += random(-weather.speed, weather.speed) * 0.3;
    if (this.y > height) this.y = 0;
    this.show();
  }

  show() {
    noStroke();
    fill(weather.color);
    circle(this.x, this.y, weather.size);
  }
}
