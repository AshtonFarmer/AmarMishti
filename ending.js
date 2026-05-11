
window.addEventListener("DOMContentLoaded", () => {

  const btsBtn = document.getElementById("btsBtn");
  const btsModal = document.getElementById("btsModal");
  const closeBts = document.getElementById("closeBts");

  // Wait for flower animation to feel complete
  setTimeout(() => {
    if(btsBtn){
      btsBtn.classList.remove("hidden-bts");

      requestAnimationFrame(() => {
        btsBtn.classList.add("show-bts");
      });
    }
  }, 3200);

  if(btsBtn){
    btsBtn.addEventListener("click", () => {
      btsModal.classList.remove("hidden-bts");
    });
  }

  if(closeBts){
    closeBts.addEventListener("click", () => {
      btsModal.classList.add("hidden-bts");
    });
  }


  const actualCode = document.getElementById("actualCode");

  async function loadActualCode(){
    if(!actualCode) return;

    try{
      const response = await fetch("FULL_SOURCE_CODE.txt");
      const text = await response.text();
      actualCode.textContent = text;
    }catch(e){
      actualCode.textContent = `The real source code is included in this website folder as:

FULL_SOURCE_CODE.txt

It contains the HTML, CSS, and JavaScript that made this whole birthday multiverse experience work. ❤️`;
    }
  }

  if(btsBtn){
    btsBtn.addEventListener("click", loadActualCode);
  }

});
