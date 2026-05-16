(function(){
  const openBtn=document.getElementById("openLetterBtn");
  const video=document.getElementById("heartVideo");
  const returnBtn=document.getElementById("returnBts");
  const particles=document.querySelector(".quiet-particles");
  function random(min,max){return Math.random()*(max-min)+min}
  function makeParticles(){if(!particles)return;for(let i=0;i<24;i++){const p=document.createElement("span");p.style.left=random(4,96)+"vw";p.style.setProperty("--drift",random(-80,80).toFixed(1)+"px");p.style.animationDuration=random(8,17).toFixed(2)+"s";p.style.animationDelay=random(-16,0).toFixed(2)+"s";p.style.opacity=random(.32,.78);particles.appendChild(p)}}
  function openEnvelope(){document.body.classList.add("opened");openBtn.disabled=true;setTimeout(()=>document.body.classList.add("video-revealed"),1650);setTimeout(()=>{try{video.play().catch(()=>{})}catch(e){}},2450)}
  function closeEnvelopeAfterVideo(){try{video.pause()}catch(e){} document.body.classList.add("finished");document.body.classList.remove("video-revealed");setTimeout(()=>{if(returnBtn)returnBtn.classList.remove("hidden-eyes")},900)}
  openBtn.addEventListener("click",openEnvelope);
  video.addEventListener("ended",closeEnvelopeAfterVideo);
  makeParticles();
})();