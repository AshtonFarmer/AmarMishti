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

function nextQuote(){
  rainQuote.classList.add("fade");
  setTimeout(()=>{
    quoteIndex=(quoteIndex+1)%quotes.length;
    rainQuote.textContent=quotes[quoteIndex];
    rainQuote.classList.remove("fade");
  },800);
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
  setInterval(nextQuote,4200);

  if(navigator.vibrate){
    navigator.vibrate([80,40,80]);
  }
});
