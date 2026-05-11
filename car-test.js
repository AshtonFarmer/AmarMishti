const scenes = document.querySelectorAll(".scene");

function showScene(index){
  scenes.forEach(scene => scene.classList.remove("active"));

  const current = scenes[index];
  current.classList.add("active");

  const car = current.querySelector(".car");
  const text = current.querySelector(".text");

  car.style.animation = "none";
  text.style.animation = "none";

  car.offsetHeight;
  text.offsetHeight;

  car.style.animation = "";
  text.style.animation = "";
}

showScene(0);

setTimeout(() => showScene(1), 6500);
setTimeout(() => showScene(2), 13000);
