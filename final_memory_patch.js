
const memoryPhotos = [
  "purple-saree.jpg",
  "garden-look.jpg",
  "flower-selfie.jpg",
  "holding-hands.jpg",
  "restaurant-date.jpg",
  "tongue-selfie.jpg",
  "jeep-feet.jpg"
];

function startMemoryUniverse(){

  const universe =
    document.getElementById("memoryUniverse");

  const container =
    document.getElementById("memoryContainer");

  universe.classList.remove("hidden");

  let index = 0;

  const interval = setInterval(()=>{

    if(index >= memoryPhotos.length){

      clearInterval(interval);

      setTimeout(()=>{
        window.location.href = "index.html";
      },7000);

      return;
    }

    const photo =
      document.createElement("img");

    photo.src =
      memoryPhotos[index];

    photo.className =
      "memory-photo";

    photo.style.left =
      Math.random()*65 + "%";

    photo.style.top =
      Math.random()*60 + "%";

    container.appendChild(photo);

    index++;

  },2300);
}

window.addEventListener("DOMContentLoaded", ()=>{

  const replayBtn =
    document.querySelector(".replay-btn");

  if(replayBtn){

    replayBtn.addEventListener("click",(e)=>{

      e.preventDefault();

      document.body.style.opacity = "0";

      setTimeout(()=>{

        startMemoryUniverse();

        document.body.style.opacity = "1";

      },1800);

    });

  }

});
