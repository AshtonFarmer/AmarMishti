const scenes = Array.from(document.querySelectorAll(".scene"));
const label = document.getElementById("sceneLabel");
const names = ["Jeep Universe", "F1 Universe", "BMW Universe"];

function restart(el){
  if(!el) return;
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "";
}

function showScene(index){
  scenes.forEach(scene => scene.classList.remove("active"));

  const current = scenes[index];
  current.classList.add("active");
  label.textContent = names[index];

  restart(current.querySelector(".car"));
  restart(current.querySelector(".text"));
}

showScene(0);
setTimeout(() => showScene(1), 7500);
setTimeout(() => showScene(2), 15000);
