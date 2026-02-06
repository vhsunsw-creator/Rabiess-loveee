let step = 0;
let letterIndex = 0;

const texts = [
  "Hey Rabiesss 👀",
  "I hope you’re smiling right now 😌",
  "Because this is just for you 💖",
  "Before I say anything important…"
];

const letters = [
  "You have no idea how calm I feel when I talk to you 🥺",
  "Somehow you became my favorite notification 😌",
  "You’re my comfort and my chaos at the same time 💭",
  "And I wouldn’t change a thing about us 💖"
];

function next() {
  step++;
  if (step < texts.length) {
    document.getElementById("text").innerText = texts[step];
  } else {
    showEnvelope();
  }
}

function showEnvelope() {
  const card = document.getElementById("card");
  card.innerHTML = `
    <div class="envelope" onclick="openLetter()">✉️</div>
    <p>Tap the letter…</p>
  `;
}

function openLetter() {
  if (letterIndex < letters.length) {
    const card = document.getElementById("card");
    card.innerHTML += `<div class="letter">${letters[letterIndex]}</div>`;
    letterIndex++;
  } else {
    showFinal();
  }
}

function showFinal() {
  const card = document.getElementById("card");
  card.classList.add("final");
  card.innerHTML = `
    <img src="final.jpg">
    <h1>I love you Rabiesss 👽💖</h1>
    <p>Forever yours 😌</p>
  `;
}

// floating hearts
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);
