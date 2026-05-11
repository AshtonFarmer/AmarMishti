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
   FORCE FIXED CAR UNIVERSE FLOW
========================================================= */

function restartAnimation(el){
  if(!el) return;
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "";
}

function startCarUniverseSequence(afterSequence){
  const carUniverse = document.getElementById("carUniverse");
  const scenes = document.querySelectorAll(".car-scene");

  carUniverse.classList.remove("hidden");
  carUniverse.style.opacity = "1";

  function showScene(index){
    scenes.forEach(scene => scene.classList.remove("active-scene"));

    const scene = scenes[index];
    scene.classList.add("active-scene");

    restartAnimation(scene.querySelector(".vehicle-img"));
    restartAnimation(scene.querySelector(".car-smoke-text"));
  }

  showScene(0);

  setTimeout(() => showScene(1), 7200);
  setTimeout(() => showScene(2), 14400);

  setTimeout(() => {
    carUniverse.style.transition = "opacity 1.8s ease";
    carUniverse.style.opacity = "0";

    setTimeout(() => {
      carUniverse.classList.add("hidden");
      carUniverse.style.opacity = "";
      carUniverse.style.transition = "";

      if(afterSequence) afterSequence();
    }, 1900);
  }, 21600);
}

boltBtn.addEventListener("click", async () => {
  vibrateHeart();

  try{
    bgMusic.volume = 0.35;
    await bgMusic.play();
  }catch(e){}

  startCarUniverseSequence(() => {
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
