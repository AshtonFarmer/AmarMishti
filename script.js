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

boltBtn.addEventListener("click", async () => {
  vibrateHeart();

  try{
    bgMusic.volume = 0.35;
    await bgMusic.play();
  }catch(e){}

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
