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





/* =========================================================
   VERIFIED WORKING CAR UNIVERSE FLOW
========================================================= */

const carUniverse = document.getElementById("carUniverse");
const carScenes = Array.from(document.querySelectorAll("#carUniverse .car-scene"));

let carTimer1;
let carTimer2;
let carTimer3;
let carTimer4;

function restartCarAnim(el, className){
  if(!el) return;
  el.classList.remove(className);
  el.offsetHeight;
  el.classList.add(className);
}

function showCarScene(index){
  carScenes.forEach(scene => scene.classList.remove("active"));

  const current = carScenes[index];
  if(!current) return;

  current.classList.add("active");

  const car = current.querySelector(".car");
  const text = current.querySelector(".car-text");

  if(car) car.classList.remove("drive");
  if(text) text.classList.remove("animate");

  setTimeout(() => {
    restartCarAnim(text, "animate");
  }, 250);

  setTimeout(() => {
    restartCarAnim(car, "drive");
  }, 1300);
}

function startCarUniverseSequence(afterSequence){
  if(!carUniverse || carScenes.length === 0){
    afterSequence();
    return;
  }

  clearTimeout(carTimer1);
  clearTimeout(carTimer2);
  clearTimeout(carTimer3);
  clearTimeout(carTimer4);

  carUniverse.classList.remove("hidden");
  carUniverse.style.opacity = "1";

  showCarScene(0);

  carTimer1 = setTimeout(() => showCarScene(1), 8000);
  carTimer2 = setTimeout(() => showCarScene(2), 16000);

  carTimer3 = setTimeout(() => {
    carUniverse.style.transition = "opacity 1.4s ease";
    carUniverse.style.opacity = "0";

    carTimer4 = setTimeout(() => {
      carUniverse.classList.add("hidden");
      carUniverse.style.opacity = "";
      carUniverse.style.transition = "";
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
