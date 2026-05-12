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

function showScene(index){
  clearTimeout(currentTimer1);
  clearTimeout(currentTimer2);

  scenes.forEach(scene => scene.classList.remove("active"));

  const current = scenes[index];
  current.classList.add("active");
  label.textContent = names[index];

  const car = current.querySelector(".car");
  const text = current.querySelector(".text");

  // Show centered first so you can confirm it exists.
  car.classList.remove("drive");
  text.classList.remove("animate");

  currentTimer1 = setTimeout(() => {
    restart(text, "animate");
  }, 250);

  currentTimer2 = setTimeout(() => {
    restart(car, "drive");
  }, 1300);
}

showScene(0);

// Automatic sequence
setTimeout(() => showScene(1), 8000);
setTimeout(() => showScene(2), 16000);
