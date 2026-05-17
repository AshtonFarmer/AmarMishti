const spreads=[...document.querySelectorAll(".spread")];
const prev=document.getElementById("prevPage");
const next=document.getElementById("nextPage");
const num=document.getElementById("pageNumber");
const total=document.getElementById("pageTotal");
let current=0, turning=false;
if(total) total.textContent=spreads.length;
function update(){prev.disabled=current===0;next.disabled=current===spreads.length-1;num.textContent=current+1;}
function go(i,dir){
 if(turning||i<0||i>=spreads.length||i===current)return;
 turning=true;
 const old=spreads[current], neu=spreads[i];
 old.classList.add(dir==="next"?"turning-next":"turning-prev");
 setTimeout(()=>{old.classList.remove("active","turning-next","turning-prev");neu.classList.add("active");current=i;update();setTimeout(()=>turning=false,120)},420);
}
prev.addEventListener("click",()=>go(current-1,"prev"));
next.addEventListener("click",()=>go(current+1,"next"));
window.addEventListener("keydown",e=>{if(e.key==="ArrowRight")go(current+1,"next");if(e.key==="ArrowLeft")go(current-1,"prev")});
let sx=0,sy=0;
document.addEventListener("touchstart",e=>{sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY},{passive:true});
document.addEventListener("touchend",e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)){dx<0?go(current+1,"next"):go(current-1,"prev")}},{passive:true});
update();