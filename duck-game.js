const arena=document.getElementById("gameArena"),duck=document.getElementById("duckPlayer"),scoreEl=document.getElementById("score"),timeEl=document.getElementById("time"),goalEl=document.getElementById("goal"),msg=document.getElementById("duckMessage"),startBtn=document.getElementById("startDuckGame");
const joystick=document.getElementById("duckJoystick"),joystickThumb=document.getElementById("joystickThumb");
const goal=12;let score=0,timeLeft=30,running=false,x=40,y=150,timer,spawnTimer,animationId;const keys=new Set();
let joyX=0,joyY=0,joyActive=false,joyPointerId=null;
const funny=["QUACK detected.","Bread acquired. Emotional support increased.","Duck has entered silly mode.","Multiverse duck approves.","Professional waddling detected.","Too much duck energy in one timeline.","Duck says: absolutely iconic."];
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}function rect(){return arena.getBoundingClientRect()}function setDuck(){const r=rect();x=clamp(x,0,r.width-72);y=clamp(y,0,r.height-62);duck.style.left=x+"px";duck.style.top=y+"px"}
function overlap(a,b){return !(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom)}
function spawn(){if(!running)return;const r=rect(),bad=Math.random()<.28,item=document.createElement("div");item.className=bad?"hazard":"collectible";item.dataset.type=bad?"hazard":"good";item.textContent=bad?"💧":(Math.random()<.55?"🍞":"❤️");item.style.left=Math.random()*(r.width-46)+"px";item.style.top=Math.random()*(r.height-54)+"px";arena.appendChild(item);setTimeout(()=>item.remove(),bad?4200:5200)}
function confetti(){const r=rect();for(let i=0;i<28;i++){const c=document.createElement("div");c.className="duck-confetti";c.style.left=r.width/2+"px";c.style.top=r.height/2+"px";c.style.background=["#ffd84a","#74d7ff","#ff8bd1","#fff"][i%4];c.style.setProperty("--x",(-160+Math.random()*320)+"px");c.style.setProperty("--y",(-130+Math.random()*260)+"px");arena.appendChild(c);setTimeout(()=>c.remove(),1100)}}
function end(win){running=false;clearInterval(timer);clearInterval(spawnTimer);cancelAnimationFrame(animationId);resetJoystick();msg.textContent=win?"Secret universe complete 🦆⚡ Maximum quack achieved.":"Duck ran out of time. The quack portal needs more bread.";startBtn.textContent=win?"Play again 🦆":"Try again 🦆";startBtn.disabled=false;if(win)confetti()}
function update(){if(!running)return;let vx=0,vy=0;if(keys.has("ArrowLeft")||keys.has("a"))vx-=4.2;if(keys.has("ArrowRight")||keys.has("d"))vx+=4.2;if(keys.has("ArrowUp")||keys.has("w"))vy-=4.2;if(keys.has("ArrowDown")||keys.has("s"))vy+=4.2;if(Math.abs(joyX)>.08)vx+=joyX*4.6;if(Math.abs(joyY)>.08)vy+=joyY*4.6;x+=vx;y+=vy;setDuck();if(vx<-.05)duck.style.transform="scaleX(-1)";else if(vx>.05)duck.style.transform="scaleX(1)";
const dr=duck.getBoundingClientRect();document.querySelectorAll(".collectible,.hazard").forEach(item=>{if(overlap(dr,item.getBoundingClientRect())){const type=item.dataset.type;item.remove();if(type==="good"){score++;scoreEl.textContent=score;msg.textContent=funny[Math.floor(Math.random()*funny.length)];if(score>=goal)end(true)}else{score=Math.max(0,score-2);scoreEl.textContent=score;msg.textContent="Puddle attack. Duck lost bread confidence."}}});animationId=requestAnimationFrame(update)}
function start(){document.querySelectorAll(".collectible,.hazard,.duck-confetti").forEach(e=>e.remove());score=0;timeLeft=30;x=40;y=150;running=true;scoreEl.textContent=score;timeEl.textContent=timeLeft;goalEl.textContent=goal;msg.textContent="Duck portal open. Collect bread and hearts.";startBtn.disabled=true;startBtn.textContent="Duck running...";setDuck();for(let i=0;i<6;i++)setTimeout(spawn,i*300);spawnTimer=setInterval(spawn,720);timer=setInterval(()=>{timeLeft--;timeEl.textContent=timeLeft;if(timeLeft<=0)end(score>=goal)},1000);update()}

function setJoystickFromPoint(clientX,clientY){
  if(!joystick||!joystickThumb)return;
  const ring=joystick.querySelector(".joystick-ring");
  const r=ring.getBoundingClientRect();
  const cx=r.left+r.width/2,cy=r.top+r.height/2,max=r.width*.34;
  const dx=clientX-cx,dy=clientY-cy;
  const dist=Math.hypot(dx,dy);
  const limited=Math.min(dist,max);
  const angle=Math.atan2(dy,dx);
  const tx=Math.cos(angle)*limited,ty=Math.sin(angle)*limited;
  joyX=clamp(dx/max,-1,1);
  joyY=clamp(dy/max,-1,1);
  joystickThumb.style.transform=`translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
}
function resetJoystick(){
  joyX=0;joyY=0;joyActive=false;joyPointerId=null;
  document.body.classList.remove("duck-joystick-active");
  if(joystickThumb)joystickThumb.style.transform="translate(-50%,-50%)";
}
if(joystick){
  joystick.addEventListener("pointerdown",e=>{
    e.preventDefault();
    joyActive=true;
    joyPointerId=e.pointerId;
    joystick.setPointerCapture(e.pointerId);
    document.body.classList.add("duck-joystick-active");
    setJoystickFromPoint(e.clientX,e.clientY);
  });
  joystick.addEventListener("pointermove",e=>{
    if(!joyActive||e.pointerId!==joyPointerId)return;
    e.preventDefault();
    setJoystickFromPoint(e.clientX,e.clientY);
  });
  joystick.addEventListener("pointerup",e=>{if(e.pointerId===joyPointerId)resetJoystick()});
  joystick.addEventListener("pointercancel",resetJoystick);
  joystick.addEventListener("lostpointercapture",resetJoystick);
}

window.addEventListener("keydown",e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","w","a","s","d"].includes(k)){e.preventDefault();keys.add(k)}});window.addEventListener("keyup",e=>keys.delete(e.key.length===1?e.key.toLowerCase():e.key));window.addEventListener("resize",setDuck);startBtn.addEventListener("click",start);setDuck();
