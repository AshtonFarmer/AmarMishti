const rainStartBtn=document.getElementById("rainStartBtn");
const rainReturn=document.getElementById("rainReturn");
const rainSong=document.getElementById("rainSong");
const rainVideo=document.getElementById("rainVideo");
const rainQuote=document.getElementById("rainQuote");

const quotes=[
  "Rain always feels better when it reminds me of you.",
  "Some of my favorite moments are the quiet ones with you.",
  "Even storms feel peaceful beside you.",
  "You make me happy, even in the dark and stormy nights.",
  "If the world felt heavy, I would still look for you in the rain.",
  "With you, even the storm sounds like a love song."
];

let quoteIndex=0;
let quoteTimer;

function nextQuote(){
  rainQuote.classList.add("fade");
  setTimeout(()=>{
    quoteIndex=(quoteIndex+1)%quotes.length;
    rainQuote.textContent=quotes[quoteIndex];
    rainQuote.classList.remove("fade");
  },800);
}

// CodePen-style rain generation, converted from jQuery to vanilla JS.
function randRange(minNum,maxNum){
  return Math.floor(Math.random()*(maxNum-minNum+1))+minNum;
}

function createRain(){
  const rain=document.querySelector(".rain");
  if(!rain) return;

  rain.innerHTML="";
  const nbDrop=window.innerWidth<700?260:520;

  for(let i=1;i<nbDrop;i++){
    const drop=document.createElement("div");
    drop.className="drop";
    drop.id="drop"+i;

    drop.style.left=randRange(0,window.innerWidth+500)+"px";
    drop.style.top=randRange(-1000,window.innerHeight+400)+"px";
    drop.style.animationDelay=(-Math.random()*1.2).toFixed(2)+"s";
    drop.style.animationDuration=(0.50+Math.random()*0.38).toFixed(2)+"s";
    drop.style.opacity=(0.25+Math.random()*0.32).toFixed(2);

    rain.appendChild(drop);
  }
}

rainStartBtn.addEventListener("click",async()=>{
  document.body.classList.add("rain-started");

  try{
    rainSong.volume=.42;
    await rainSong.play();
  }catch(e){}

  try{
    rainVideo.muted=true;
    await rainVideo.play();
  }catch(e){}

  rainStartBtn.classList.add("hidden-rain");
  rainReturn.classList.remove("hidden-rain");

  nextQuote();
  clearInterval(quoteTimer);
  quoteTimer=setInterval(nextQuote,4200);

  if(navigator.vibrate){
    navigator.vibrate([80,40,80]);
  }
});

window.addEventListener("resize",createRain);
createRain();
