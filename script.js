const intro = document.getElementById("intro");
const videoPage = document.getElementById("videoPage");
const timeline = document.getElementById("timeline");
const timelineTitle = document.getElementById("timelineTitle");
const foundText = document.getElementById("foundText");
const boltBtn = document.getElementById("boltBtn");
const bgMusic = document.getElementById("bgMusic");
const video = document.getElementById("loveVideo");
const startBtn = document.getElementById("startBtn");

function vibrateHeart(){
  if(navigator.vibrate){
    navigator.vibrate([120, 50, 120]);
  }
}

function resetTimeline(){
  if(foundText){
    foundText.classList.remove("found-show");
    foundText.classList.add("found-hidden");
  }

  document.querySelectorAll(".scan-line").forEach(line => {
    line.classList.remove("show-line");
    line.classList.add("hidden-line");
  });
}

function runTimelineTransition(options){
  const searchText = options.searchText || "Searching the multiverse...";
  const foundMessage = options.foundMessage || "Tanima Das found ❤️";
  const after = options.after || function(){};

  resetTimeline();

  timelineTitle.textContent = searchText;
  foundText.textContent = foundMessage;

  timeline.classList.remove("hidden");
  timeline.style.display = "grid";
  timeline.style.opacity = "1";

  const scanLines = document.querySelectorAll(".scan-line");

  scanLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.remove("hidden-line");
      line.classList.add("show-line");
    }, 700 + (index * 650));
  });

  setTimeout(() => {
    foundText.classList.remove("found-hidden");
    foundText.classList.add("found-show");
  }, 3900);

  setTimeout(() => {
    timeline.classList.add("hidden");
    timeline.style.display = "";
    resetTimeline();
    after();
  }, 7800);
}




function playCarSequenceThen(afterSequence){
  const overlay = document.getElementById("carSequenceOverlay");
  const frame = document.getElementById("carSequenceFrame");

  if(!overlay || !frame){
    afterSequence();
    return;
  }

  overlay.classList.remove("hidden-car-sequence");
  overlay.classList.remove("fade-out-car-sequence");

  // Reload the iframe every time so the cars animate from the beginning.
  frame.src = "car-sequence.html?v=" + Date.now();

  // Car sequence timing from verified standalone page:
  // Jeep starts, F1 at 8s, BMW at 16s, finish around 23.5s.
  setTimeout(() => {
    overlay.classList.add("fade-out-car-sequence");

    setTimeout(() => {
      frame.src = "about:blank";
      overlay.classList.add("hidden-car-sequence");
      overlay.classList.remove("fade-out-car-sequence");
      afterSequence();
    }, 1500);

  }, 23500);
}

boltBtn.addEventListener("click", async () => {
  vibrateHeart();

  try{
    bgMusic.volume = 0.35;
    await bgMusic.play();
  }catch(e){}

  playCarSequenceThen(() => {
    runTimelineTransition({
      searchText: "Searching the multiverse...",
      foundMessage: "Tanima Das found ❤️",
      after: () => {
        intro.classList.add("hidden");
        videoPage.classList.remove("hidden");
        window.scrollTo(0,0);
      }
    });
  });
});


startBtn.addEventListener("click", async () => {
  startBtn.classList.add("hidden-btn");
  video.controls = true;
  video.muted = false;
  video.currentTime = 0;

  try{
    await video.play();
  }catch(e){
    startBtn.classList.remove("hidden-btn");
    startBtn.textContent = "Tap again to play ❤️";
    return;
  }

  try{
    if(video.requestFullscreen){
      await video.requestFullscreen();
    }else if(video.webkitEnterFullscreen){
      video.webkitEnterFullscreen();
    }else if(video.webkitRequestFullscreen){
      await video.webkitRequestFullscreen();
    }
  }catch(e){}
});

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  if(params.get("replay") === "1"){
    intro.classList.add("hidden");
    videoPage.classList.add("hidden");
    resetTimeline();

    setTimeout(() => {
      runTimelineTransition({
        searchText: "Searching for us in another universe...",
        foundMessage: "Another lifetime found ❤️",
        after: () => {
          intro.classList.remove("hidden");
          videoPage.classList.add("hidden");

          if(window.history && window.history.replaceState){
            window.history.replaceState({}, document.title, "index.html");
          }

          window.scrollTo(0,0);
        }
      });
    }, 400);
  }
});


// Birthday page fade-in after sunset heartbeat restart
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const overlay = document.getElementById("birthdayFadeOverlay");

  if(params.get("fadein") === "1" && overlay){
    overlay.classList.remove("hidden-fade");

    setTimeout(() => {
      overlay.classList.add("fade-away-birthday");
    }, 300);

    setTimeout(() => {
      overlay.classList.add("hidden-fade");

      if(window.history && window.history.replaceState){
        window.history.replaceState({}, document.title, "index.html");
      }
    }, 2600);
  }
});


/* =========================================================
   VIDEO PAGE CUTE ENVELOPES
========================================================= */

const envelopeNotes = {
  left: {
    title: "Important chicken business 💌",
    text: "\"What did the chicken say to the pig?\" \"Fawwwwkkkkk Off!\""
  },
  right: {
    title: "Extremely serious bird joke 💌",
    text: "\"Why do seagulls fly over the ocean? Because if they flew over the bay, they'd be bagels.\""
  }
};

const jokeModal = document.getElementById("jokeEnvelopeModal");
const jokeTitle = document.getElementById("jokeTitle");
const jokeText = document.getElementById("jokeText");
const closeJokeLetter = document.getElementById("closeJokeLetter");

document.querySelectorAll(".video-envelope").forEach(envelope => {
  const button = envelope.querySelector(".envelope-btn");

  button.addEventListener("click", () => {
    const key = envelope.dataset.envelope;
    const note = envelopeNotes[key];

    envelope.classList.add("opened");

    jokeTitle.textContent = note.title;
    jokeText.textContent = note.text;

    jokeModal.classList.remove("hidden-joke");
  });
});

if(closeJokeLetter){
  closeJokeLetter.addEventListener("click", () => {
    jokeModal.classList.add("hidden-joke");
  });
}

if(jokeModal){
  jokeModal.addEventListener("click", (e) => {
    if(e.target === jokeModal){
      jokeModal.classList.add("hidden-joke");
    }
  });
}


/* BIRTHDAY CHERRY BLOSSOM PETALS */
(function(){
  const canvas = document.getElementById("petalCanvas");
  if(!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let petals = [];

  function makePetal(randomY=false){
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -40 - Math.random() * 120,
      r: 10 + Math.random() * 15,
      speedY: .65 + Math.random() * 1.15,
      speedX: -0.45 + Math.random() * .9,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: .014 + Math.random() * .03,
      rotate: Math.random() * Math.PI * 2,
      rotateSpeed: -0.03 + Math.random() * .06,
      alpha: .62 + Math.random() * .35
    };
  }

  function resizePetals(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = width < 700 ? 42 : 78;
    petals = Array.from({length: count}, () => makePetal(true));
  }

  function drawPetal(p){
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotate);
    ctx.globalAlpha = p.alpha;

    const grad = ctx.createRadialGradient(0,0,1,0,0,p.r*2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(.35, "rgba(255,195,228,.95)");
    grad.addColorStop(.8, "rgba(255,95,178,.45)");
    grad.addColorStop(1, "rgba(255,95,178,0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * .72, p.r * 1.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animatePetals(){
    ctx.clearRect(0,0,width,height);

    petals.forEach(p => {
      p.sway += p.swaySpeed;
      p.rotate += p.rotateSpeed;
      p.x += p.speedX + Math.sin(p.sway) * .55;
      p.y += p.speedY;

      if(p.y > height + 60 || p.x < -90 || p.x > width + 90){
        Object.assign(p, makePetal(false));
      }

      drawPetal(p);
    });

    requestAnimationFrame(animatePetals);
  }

  window.addEventListener("resize", resizePetals);
  resizePetals();
  animatePetals();
})();
