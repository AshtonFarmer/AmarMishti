/* FLOWER GARDEN FIREFLIES
   Creates a small number of living, drifting fireflies.
   Safe: does not change flower bloom logic.
*/

(function(){
  const FIREFLY_COUNT = 10;

  function random(min, max){
    return Math.random() * (max - min) + min;
  }

  function createFirefly(index){
    const fly = document.createElement("span");
    fly.className = "firefly";

    if(index % 4 === 0) fly.classList.add("near");
    if(index % 5 === 0) fly.classList.add("far");

    fly.style.left = random(8, 92) + "vw";
    fly.style.top = random(18, 82) + "vh";

    fly.style.setProperty("--move-x", random(-90, 90).toFixed(1) + "px");
    fly.style.setProperty("--move-y", random(-70, 70).toFixed(1) + "px");
    fly.style.setProperty("--drift-time", random(5.8, 10.5).toFixed(2) + "s");
    fly.style.setProperty("--pulse-time", random(2.3, 4.8).toFixed(2) + "s");

    fly.style.animationDelay = random(-7, 0).toFixed(2) + "s";

    return fly;
  }

  function initFireflies(){
    const field = document.querySelector(".firefly-field");
    if(!field) return;

    field.innerHTML = "";

    for(let i = 0; i < FIREFLY_COUNT; i++){
      field.appendChild(createFirefly(i));
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initFireflies);
  }else{
    initFireflies();
  }
})();
