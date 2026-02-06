let currentPage = 1;

// Your personal lines for envelopes
const letters = [
  "Hey Rabiesss 😏… you are my world 💖",
  "Every smile of yours makes me happier than ever 😍",
  "Even small things you do make my heart skip beats 💘",
  "I love every moment with you, seriously 💕"
];

// Function to navigate pages
function showPage(pageNum){
  if(currentPage !== "final") document.getElementById(`page${currentPage}`).classList.remove("active");
  document.getElementById(`page${pageNum}`).classList.add("active");
  currentPage = pageNum;

  const env = document.getElementById(`env${pageNum-2}`);
  if(env) flyInEnvelope(env);
}

// Envelope animation fly-in
function flyInEnvelope(env){
  const startX = Math.random()*window.innerWidth - 150;
  const startY = -200;
  env.style.left = startX + "px";
  env.style.top = startY + "px";
  const targetX = window.innerWidth/2 - env.offsetWidth/2;
  const targetY = window.innerHeight/2 - env.offsetHeight/2;

  env.animate([
    { transform:`translate(0,0) rotate(0deg)` },
    { transform:`translate(${targetX-startX}px,${targetY-startY}px) rotate(${Math.random()*20-10}deg)` }
  ], { duration:1500, fill:"forwards", easing:"ease-out" });

  env.onclick = ()=>openEnvelope(env);
}

// Open envelope and type letter
function openEnvelope(env){
  env.classList.add("open");
  const pageNum = currentPage;
  const letter = document.getElementById(`letter${pageNum-2}`);
  letter.classList.add("show");

  let text = letters[pageNum-3] || "💖💖💖"; 
  let i=0;

  function typeWriter(){
    if(i<text.length){
      letter.innerHTML+=text.charAt(i);
      i++;
      setTimeout(typeWriter,50);
    } else {
      createFloatingHearts(window.innerWidth/2,window.innerHeight/2,5);
      letter.onclick = ()=>{
        letter.classList.remove("show");
        if(pageNum<7) showPage(pageNum+1); else showFinal();
      }
    }
  }
  typeWriter();
}

// ===== FINAL GIFT =====
function showFinal(){
  // Hide previous page
  if(currentPage !== "final"){
    document.getElementById(`page${currentPage}`).classList.remove("active");
  }

  // Show final gift page
  const final = document.getElementById("page8");
  final.classList.add("active");
  currentPage = "final";

  const gift = document.getElementById("gift");
  const giftBox = gift.querySelector(".gift-box");
  const photo = gift.querySelector(".gift-photo");
  const finalText = document.getElementById("finalText");

  // Reset styles in case of refresh
  giftBox.style.transform = "rotateX(0deg) scale(1)";
  giftBox.style.opacity = "1";
  photo.style.opacity = "0";
  photo.style.transform = "scale(0.85)";
  finalText.style.display = "none";

  // Remove previous click listener to avoid duplicates
  gift.replaceWith(gift.cloneNode(true));
  const newGift = document.getElementById("gift");

  newGift.addEventListener("click", () => {
    giftBox.style.transform = "rotateX(90deg) scale(0.8)";
    giftBox.style.opacity = "0";

    // Delay to reveal photo
    setTimeout(() => {
      photo.style.opacity = "1";
      photo.style.transform = "scale(1)";
      finalText.style.display = "block";
      startFloatingHearts();
    }, 800);
  });
}

// ===== FLOATING HEARTS =====
function createFloatingHearts(x,y,count=10){
  for(let i=0;i<count;i++){
    const heart=document.createElement("span");
    heart.innerHTML="💖";
    heart.style.position="absolute";
    heart.style.left=x+"px";
    heart.style.top=y+"px";
    heart.style.fontSize=Math.random()*35+25+"px";
    heart.style.opacity=1;
    document.body.appendChild(heart);

    const angle=Math.random()*2*Math.PI;
    const dist=Math.random()*150+50;
    const dx=Math.cos(angle)*dist;
    const dy=Math.sin(angle)*dist;

    heart.animate([
      {transform:'translate(0,0)',opacity:1},
      {transform:`translate(${dx}px,${dy}px)`,opacity:0}
    ],{duration:1500+Math.random()*500,fill:"forwards",easing:"ease-out"});

    setTimeout(()=>heart.remove(),2000);
  }
}

// Floating hearts after gift unwrap
function startFloatingHearts(){
  const interval=setInterval(()=>{
    for(let i=0;i<10;i++) createFloatingHearts(Math.random()*window.innerWidth,Math.random()*window.innerHeight,1);
  },200);
  setTimeout(()=>clearInterval(interval),7000);
}

// Optional background floating hearts
function createBGHearts() {
  const container = document.createElement("div");
  container.className = "bg-hearts";
  document.body.appendChild(container);

  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = Math.random()>0.5?"💖":"✨";
    heart.style.left = Math.random()*window.innerWidth + "px";
    heart.style.animationDuration = (6 + Math.random()*6) + "s";
    container.appendChild(heart);

    setTimeout(()=>heart.remove(),12000);
  },300);
}

createBGHearts();
