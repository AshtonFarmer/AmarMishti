const bloomBtn = document.getElementById("bloomBtn");
const gardenReturn = document.getElementById("gardenReturn");
const petalRain = document.querySelector(".petal-rain");

function makePetals(){
  if(!petalRain) return;

  petalRain.innerHTML = "";
  const count = window.innerWidth < 700 ? 34 : 58;

  for(let i = 0; i < count; i++){
    const petal = document.createElement("span");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (7 + Math.random() * 8).toFixed(2) + "s";
    petal.style.animationDelay = (-Math.random() * 10).toFixed(2) + "s";
    petal.style.opacity = (0.35 + Math.random() * 0.55).toFixed(2);
    petal.style.setProperty("--drift", (-80 + Math.random() * 160).toFixed(0) + "px");
    petalRain.appendChild(petal);
  }
}

bloomBtn.addEventListener("click", () => {
  document.body.classList.add("garden-bloomed");
  bloomBtn.classList.add("hidden-garden");
  gardenReturn.classList.remove("hidden-garden");

  if(navigator.vibrate){
    navigator.vibrate([80,40,80]);
  }
});

window.addEventListener("resize", makePetals);
makePetals();
