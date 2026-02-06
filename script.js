let currentPage = 1;

const letters = [
  "Hey Rabiesss 😏… You have no idea how happy you make me 🥰",
  "Every message from you is my favorite 💭… especially when you tease me 😜",
  "Even your quirks are adorable 😍… I catch myself smiling at nothing thinking of you 💖",
  "And I wouldn’t trade this feeling for anything… just stay mine 💘"
];

// NEXT BUTTON
document.querySelector(".next-btn").addEventListener("click", () => showPage(2));

function showPage(pageNum){
  document.getElementById(`page${currentPage}`).classList.remove("active");
  const nextPage = document.getElementById(`page${pageNum}`);
  nextPage.classList.add("active");
  currentPage = pageNum;

  const env = nextPage.querySelector(".envelope");
  if(env) flyInEnvelope(env);
}

function flyInEnvelope(env){
  const startX = Math.random()*window.innerWidth - 150;
  const startY = -200;
  env.style.left = startX + "px";
  env.style.top = startY + "px";
  const targetX = window.innerWidth/2 - 75;
  const targetY = window.innerHeight/2 - 45;

  env.animate([
    { transform: `translate(0,0) rotate(0deg)` },
    { transform: `translate(${targetX-startX}px, ${targetY-startY}px) rotate(${Math.random()*20-10}deg)` }
  ], { duration:1500, fill:"forwards", easing:"ease-out" });

  env.onclick = () => openEnvelope(env);
}

// OPEN ENVELOPE WITH TYPEWRITER
function openEnvelope(env){
  env.classList.add("open");
  const pageNum = currentPage;
  const letter = document.getElementById(`letter${pageNum-1}`);
  letter.innerHTML = "";
  letter.classList.add("show");

  const text = letters[pageNum-2];
  let i = 0;

  function typeWriter(){
    if(i < text.length){
      letter.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter,60);
    } else {
      createFloatingHearts(window.innerWidth/2, window.innerHeight/2,5);
      letter.onclick = () => {
        letter.classList.remove("show");
        setTimeout(()=>{
          if(pageNum < 5){ showPage(pageNum+1); } else { showFinal(); }
        },600);
      }
    }
  }
  typeWriter();
}

// FINAL PAGE GIFT
function showFinal(){
  document.getElementById(`page${currentPage}`).classList.remove("active");
  const final = document.getElementById("finalPage");
  final.style.display = "flex";
  currentPage="final";

  const gift = document.getElementById("gift");
  const photo = gift.querySelector(".gift-photo");
  const text = document.getElementById("finalText");

  gift.onclick = () => {
    gift.querySelector(".gift-box").style.transform="rotateX(90deg) scale(0.8)";
    gift.querySelector(".gift-box").style.opacity="0";
    photo.style.opacity=1;
    photo.style.transform="scale(1)";
    text.style.display="block";
    startFloatingHearts();
  }
}

// FLOATING HEARTS
function createFloatingHearts(x,y,count=10){
  for(let i=0;i<count;i++){
    const heart = document.createElement("span");
    heart.innerHTML="💖";
    heart.style.position="absolute";
    heart.style.left=x+"px";
    heart.style.top=y+"px";
    heart.style.fontSize=Math.random()*35+20+"px";
    heart.style.opacity=1;
    document.body.appendChild(heart);

    const angle=Math.random()*2*Math.PI;
    const dist=Math.random()*150+50;
    const dx=Math.cos(angle)*dist;
    const dy=Math.sin(angle)*dist;

    heart.animate([
      {transform:'translate(0,0)', opacity:1},
      {transform:`translate(${dx}px,${dy}px)`, opacity:0}
    ],{duration:1500+Math.random()*500, fill:"forwards", easing:"ease-out"});

    setTimeout(()=>heart.remove(),2000);
  }
}

function startFloatingHearts(){
  const interval=setInterval(()=>{
    for(let i=0;i<10;i++){
      createFloatingHearts(Math.random()*window.innerWidth,Math.random()*window.innerHeight,1);
    }
  },200);
  setTimeout(()=>clearInterval(interval),7000);
}

// INITIAL PAGE
document.getElementById("page1").classList.add("active");
