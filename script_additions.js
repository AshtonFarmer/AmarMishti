
/* =========================
   MULTIVERSE TRANSITION FLOW
========================= */

function startUniverseTransition(){

    const transition =
        document.getElementById("multiverseTransition");

    const found =
        document.getElementById("foundText");

    transition.classList.remove("hidden");

    // small phone vibration
    if(navigator.vibrate){
        navigator.vibrate([120,60,120]);
    }

    // show FOUND text after suspense
    setTimeout(()=>{

        found.classList.remove("hidden");

    },3500);

    // fade out transition
    setTimeout(()=>{

        transition.style.opacity = "0";

    },7000);

    // remove transition completely
    setTimeout(()=>{

        transition.remove();

        // START MEMORY UNIVERSE HERE
        startMemoryUniverse();

    },8500);
}

/* =========================
   MEMORY UNIVERSE
========================= */

const memories = [
    "purple-saree.jpg",
    "garden-look.jpg",
    "flower-selfie.jpg",
    "holding-hands.jpg",
    "restaurant-date.jpg",
    "tongue-selfie.jpg",
    "jeep-feet.jpg"
];

function startMemoryUniverse(){

    let index = 0;

    const interval = setInterval(()=>{

        if(index >= memories.length){
            clearInterval(interval);
            return;
        }

        const photo = document.createElement("img");

        photo.src = memories[index];

        photo.style.position = "absolute";
        photo.style.width = "260px";
        photo.style.borderRadius = "22px";
        photo.style.boxShadow =
            "0 0 35px rgba(255,255,255,0.35)";

        photo.style.left =
            Math.random()*65 + "%";

        photo.style.top =
            Math.random()*65 + "%";

        photo.style.opacity = "0";

        photo.style.transition =
            "all 2s ease";

        document.body.appendChild(photo);

        setTimeout(()=>{
            photo.style.opacity = "1";
            photo.style.transform =
                "translateY(-12px)";
        },100);

        index++;

    },2400);
}
