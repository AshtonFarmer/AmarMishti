
/* =========================================
   SUNSET RESTART SEQUENCE
========================================= */

function startSunsetRestart(){

  const collapse =
    document.getElementById("sunsetCollapse");

  collapse.classList.remove("hidden-sunset");

  // heartbeat vibration
  if(navigator.vibrate){
    navigator.vibrate([160,80,120]);
  }

  // optional heartbeat sound
  try{
    const beat = new Audio("heartbeat.mp3");
    beat.volume = 0.45;
    beat.play();
  }catch(e){}

  // restart after sunset explosion
  setTimeout(()=>{

    window.location.href = "index.html?v=sunset";

  },5600);
}

/* =========================================
   MEMORY END OVERRIDE
========================================= */

window.addEventListener("DOMContentLoaded",()=>{

  const restartBtn =
    document.getElementById("restartUniverse");

  if(restartBtn){

    restartBtn.addEventListener("click",(e)=>{

      e.preventDefault();

      document.querySelectorAll(".floating-memory")
      .forEach((photo,index)=>{

        photo.style.transition =
          "all 2.8s ease";

        photo.style.opacity = "0";

        photo.style.transform =
          "scale(.6) translateY(-120px)";

      });

      setTimeout(()=>{

        startSunsetRestart();

      },1800);

    });

  }

});
