/* TANIMA EYES ONLY v3
   Passcode, envelope, video, manual close, return button.
*/

(function(){
  const PASSCODE = "032126"; // March 21, 2026

  const page = document.body;
  const passcodeScreen = document.getElementById("passcodeScreen");
  const dots = Array.from(document.querySelectorAll("#passcodeDots span"));
  const message = document.getElementById("passcodeMessage");

  const openBtn = document.getElementById("openLetterBtn");
  const video = document.getElementById("heartVideo");
  const closeEnvelopeBtn = document.getElementById("closeEnvelopeBtn");
  const returnBtn = document.getElementById("returnBts");
  const particles = document.querySelector(".quiet-particles");

  let entered = "";
  let finishedOnce = false;

  function random(min,max){
    return Math.random() * (max - min) + min;
  }

  function makeParticles(){
    if(!particles) return;

    particles.innerHTML = "";

    for(let i = 0; i < 24; i++){
      const p = document.createElement("span");
      p.style.left = random(4, 96) + "vw";
      p.style.setProperty("--drift", random(-80, 80).toFixed(1) + "px");
      p.style.animationDuration = random(8, 17).toFixed(2) + "s";
      p.style.animationDelay = random(-16, 0).toFixed(2) + "s";
      p.style.opacity = random(.32, .78);
      particles.appendChild(p);
    }
  }

  function updateDots(){
    dots.forEach((dot, i) => {
      dot.classList.toggle("filled", i < entered.length);
    });
  }

  function wrongCode(){
    message.textContent = "Not that one, baba ❤️";
    message.classList.remove("wrong");
    void message.offsetWidth;
    message.classList.add("wrong");

    setTimeout(() => {
      entered = "";
      updateDots();
      message.textContent = "Anniversary passcode ❤️";
    }, 650);
  }

  function unlockPage(){
    message.textContent = "Unlocked ❤️";
    page.classList.add("unlocked");

    setTimeout(() => {
      if(passcodeScreen) passcodeScreen.setAttribute("aria-hidden", "true");
    }, 900);
  }

  function addDigit(digit){
    if(page.classList.contains("unlocked")) return;
    if(entered.length >= 6) return;

    entered += digit;
    updateDots();

    if(entered.length === 6){
      if(entered === PASSCODE){
        unlockPage();
      }else{
        wrongCode();
      }
    }
  }

  function deleteDigit(){
    entered = entered.slice(0, -1);
    updateDots();
  }

  document.querySelectorAll(".keypad button").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if(key) addDigit(key);
      if(btn.dataset.delete) deleteDigit();
      if(btn.dataset.clear){
        entered = "";
        updateDots();
      }
    });
  });

  window.addEventListener("keydown", e => {
    if(!page.classList.contains("unlocked")){
      if(/^[0-9]$/.test(e.key)) addDigit(e.key);
      if(e.key === "Backspace") deleteDigit();
    }
  });

  function openEnvelope(){
    page.classList.add("opened");
    if(openBtn) openBtn.disabled = true;

    setTimeout(() => {
      page.classList.add("video-revealed");
    }, 1650);

    setTimeout(() => {
      try{
        if(video) video.play().catch(() => {});
      }catch(e){}
    }, 2450);
  }

  function closeEnvelopeAfterVideo(){
    if(finishedOnce) return;
    finishedOnce = true;

    try{
      if(video) video.pause();
    }catch(e){}

    page.classList.add("finished");
    page.classList.remove("video-revealed");

    setTimeout(() => {
      if(returnBtn){
        returnBtn.classList.remove("hidden-eyes");
      }
    }, 700);
  }

  if(openBtn) openBtn.addEventListener("click", openEnvelope);
  if(video) video.addEventListener("ended", closeEnvelopeAfterVideo);
  if(closeEnvelopeBtn) closeEnvelopeBtn.addEventListener("click", closeEnvelopeAfterVideo);

  makeParticles();
})();
