/* VIDEO AUDIO FIX
   Pauses the background music when the memory video plays.
*/

(function(){

  function setupVideoAudioFix(){

    const bgMusic = document.getElementById("bgMusic");
    const loveVideo = document.getElementById("loveVideo");

    if(!bgMusic || !loveVideo) return;

    function pauseMusic(){
      try{
        bgMusic.pause();
      }catch(e){}
    }

    function resumeMusic(){
      try{
        bgMusic.volume = 0.35;
        bgMusic.play().catch(()=>{});
      }catch(e){}
    }

    loveVideo.addEventListener("play", pauseMusic);
    loveVideo.addEventListener("playing", pauseMusic);

    loveVideo.addEventListener("pause", () => {
      if(!loveVideo.ended){
        resumeMusic();
      }
    });

    loveVideo.addEventListener("ended", resumeMusic);

  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", setupVideoAudioFix);
  } else {
    setupVideoAudioFix();
  }

})();
