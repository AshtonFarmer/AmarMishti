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
  foundText.classList.remove("found-show");
  foundText.classList.add("found-hidden");
}

function runTimelineTransition(options){
  const searchText = options.searchText || "Searching the multiverse...";
  const foundMessage = options.foundMessage || "Tanima found ❤️";
  const after = options.after || function(){};

  resetTimeline();

  timelineTitle.textContent = searchText;
  foundText.textContent = foundMessage;

  const scanLines = document.querySelectorAll(".scan-line");

  scanLines.forEach(line => {
    line.classList.remove("show-line");
    line.classList.add("hidden-line");
  });

  timeline.classList.remove("hidden");

  // Reveal scan log lines one by one
  scanLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.remove("hidden-line");
      line.classList.add("show-line");
    }, 700 + (index * 550));
  });

  // Then reveal Tanima found
  setTimeout(() => {
    foundText.classList.remove("found-hidden");
    foundText.classList.add("found-show");
  }, 3200);

  // Keep everything readable before moving on
  setTimeout(() => {
    timeline.classList.add("hidden");
    resetTimeline();

    scanLines.forEach(line => {
      line.classList.remove("show-line");
      line.classList.add("hidden-line");
    });

    after();
  }, 6200);
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

// Replay from the ending page: show another multiverse transition first.
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  if(params.get("replay") === "1"){
    // Hide the birthday page and video page immediately so only the transition shows.
    intro.classList.add("hidden");
    videoPage.classList.add("hidden");
    resetTimeline();

    // Let the page load first, then run the transition slowly.
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
    }, 350);
  }
});
