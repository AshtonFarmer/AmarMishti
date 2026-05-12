const scenes = Array.from(document.querySelectorAll(".scene"));
const label = document.getElementById("sceneLabel");
const names = ["Jeep Universe", "F1 Universe", "BMW Universe"];

let timer1;
let timer2;

function restartClass(el, className){
  if(!el) return;
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

function showScene(index){
  clearTimeout(timer1);
  clearTimeout(timer2);

  scenes.forEach(scene => {
    scene.classList.remove("active");

    const oldCar = scene.querySelector(".car");
    const oldText = scene.querySelector(".text");

    if(oldCar) oldCar.classList.remove("drive");
    if(oldText) oldText.classList.remove("animate");
  });

  const current = scenes[index];
  current.classList.add("active");

  if(label) label.textContent = names[index];

  const car = current.querySelector(".car");
  const text = current.querySelector(".text");

  // Start both effects right away. No more center pop-up.
  restartClass(text, "animate");
  restartClass(car, "drive");
}

showScene(0);
setTimeout(() => showScene(1), 8000);
setTimeout(() => showScene(2), 16000);
