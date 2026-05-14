/* SECRET DUCK UNIVERSE UNLOCK - safe add-on */
(function(){
  function css(){
    if(document.getElementById("duckUnlockStyles")) return;
    const s=document.createElement("style");
    s.id="duckUnlockStyles";
    s.textContent=`
      .duck-secret-wrap{margin:18px auto 16px;display:flex;justify-content:center;opacity:0;transform:translateY(14px) scale(.96);pointer-events:none;transition:opacity 1s ease,transform 1s ease}
      .duck-secret-wrap.duck-show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
      .duck-secret-btn{display:inline-block;padding:15px 26px;border-radius:999px;text-decoration:none;color:white;font-size:clamp(1rem,3vw,1.25rem);font-weight:900;border:1px solid rgba(255,240,190,.95);background:linear-gradient(135deg,rgba(255,195,40,.58),rgba(255,120,200,.25));box-shadow:0 0 22px rgba(255,210,60,.72),0 0 44px rgba(255,0,160,.26),inset 0 0 14px rgba(255,255,255,.12);animation:duckSecretPulse 1.8s ease-in-out infinite}
      @keyframes duckSecretPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.055)}}
      .duck-secret-hint{margin:8px 0 0;color:#ffe9f6;font-size:.95rem;opacity:.86;text-shadow:0 0 12px rgba(255,0,160,.8)}
    `;
    document.head.appendChild(s);
  }
  function unlock(){
    if(document.getElementById("duckSecretWrap")) return;
    const continueBtn=document.querySelector(".continue-btn");
    if(!continueBtn) return;
    const wrap=document.createElement("div");
    wrap.id="duckSecretWrap";
    wrap.className="duck-secret-wrap";
    wrap.innerHTML='<div><a class="duck-secret-btn" href="duck-game.html">Secret Duck Universe Found 🦆⚡</a><p class="duck-secret-hint">Both joke envelopes opened. Quack portal unlocked.</p></div>';
    continueBtn.insertAdjacentElement("beforebegin",wrap);
    setTimeout(()=>wrap.classList.add("duck-show"),150);
  }
  function check(){ if(document.querySelectorAll(".video-envelope.opened").length>=2) unlock(); }
  window.addEventListener("DOMContentLoaded",()=>{
    css();
    document.querySelectorAll(".video-envelope .envelope-btn").forEach(btn=>{
      btn.addEventListener("click",()=>setTimeout(check,150));
    });
    check();
  });
})();
