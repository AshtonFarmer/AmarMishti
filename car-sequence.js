const scenes = Array.from(document.querySelectorAll(".scene"));
const label = document.getElementById("sceneLabel");
const names = ["Jeep Universe", "F1 Universe", "BMW Universe"];

let currentTimer1;
let currentTimer2;

function restart(el, className){
  if(!el) return;
  el.classList.remove(className);
  el.offsetHeight;
  el.classList.add(className);
}

function restart(el, className){
  if(!el) return;
  el.classList.remove(className);
  el.offsetHeight;
  el.classList.add(className);
}

function showScene(index){
  scenes.forEach(scene => scene.classList.remove("active"));

  const current = scenes[index];
  current.classList.add("active");

  const car = current.querySelector(".car");
  const text = current.querySelector(".text");

  restart(text, "animate");
  restart(car, "drive");
}

showScene(0);

// Automatic sequence
setTimeout(() => showScene(1), 8000);
setTimeout(() => showScene(2), 16000);
