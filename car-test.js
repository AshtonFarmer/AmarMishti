const scenes = document.querySelectorAll(".scene");

function restart(el){
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "";
}

function showScene(index){
  scenes.forEach(scene => scene.classList.remove("active"));

  const current = scenes[index];
  current.classList.add("active");

  const car = current.querySelector(".car");
  const text = current.querySelector(".text");

  restart(car);
  restart(text);
}

showScene(0);

setTimeout(() => showScene(1), 6800);
setTimeout(() => showScene(2), 13600);
