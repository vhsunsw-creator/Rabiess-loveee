let step = 0;

const texts = [
  "Hey Rabiesss 👀",
  "I hope you’re smiling right now 😌",
  "Because I made this just for you 💖",
  "You know what?",
  "You’re annoying 😤",
  "But in the cutest way possible 🥹",
  "And somehow…",
  "You became really important to me 💭",
  "So here it is…",
  "I love you Rabiesss 👽💖"
];

function nextText() {
  step++;
  if (step < texts.length) {
    document.getElementById("text").innerText = texts[step];
  }
}

// floating hearts
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 500);
