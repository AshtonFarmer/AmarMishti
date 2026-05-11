/* CAR UNIVERSE FLOW */

const carUniverse =
  document.getElementById("carUniverse");

const carScenes =
  document.querySelectorAll(".car-scene");

function startCarUniverseSequence(afterSequence){

  carUniverse.classList.remove("hidden");

  let current = 0;

  function showScene(index){
    carScenes.forEach(scene => {
      scene.classList.remove("active-scene");
    });

    carScenes[index].classList.add("active-scene");
  }

  showScene(0);

  setTimeout(() => {
    current = 1;
    showScene(current);
  }, 7000);

  setTimeout(() => {
    current = 2;
    showScene(current);
  }, 14000);

  setTimeout(() => {

    carUniverse.style.transition =
      "opacity 2s ease";

    carUniverse.style.opacity = "0";

    setTimeout(() => {

      carUniverse.classList.add("hidden");
      carUniverse.style.opacity = "";

      if(afterSequence){
        afterSequence();
      }

    }, 2000);

  }, 21000);
}
