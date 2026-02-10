// script.js — vanilla JS interaksi untuk halaman Valentine
(function(){
  const revealBtn = document.getElementById('revealBtn');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const messageArea = document.getElementById('messageArea');
  const heartsLayer = document.querySelector('.hearts');

  function createHeart(opts={}){
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '❤️';
    const size = opts.size || Math.random()*18 + 18; // px
    h.style.fontSize = size + 'px';
    const left = (opts.left !== undefined) ? opts.left : Math.random()*100;
    h.style.left = left + 'vw';
    const duration = (opts.duration) || (4 + Math.random()*5);
    h.style.animationDuration = duration + 's, ' + (1.6 + Math.random()*1.2) + 's';
    h.style.opacity = 0.95 - Math.random()*0.25;
    heartsLayer.appendChild(h);
    h.addEventListener('animationend', ()=>{ h.remove(); });
    return h;
  }

  // Background gentle hearts: spawn occasionally
  let running = true;
  function spawnGentle(){
    if(!running) return;
    createHeart({left: Math.random()*100, size: 14 + Math.random()*22, duration: 5+Math.random()*6});
    const next = 400 + Math.random()*1200;
    setTimeout(spawnGentle, next);
  }
  spawnGentle();

  // Reveal interaction
  function showSecret(){
    // reveal inline message with smooth transition
    messageArea.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'reveal';
    p.textContent = 'Makasih ya udah bikin hari-hariku lebih seru 💕';
    messageArea.appendChild(p);
    // trigger show class after next tick
    requestAnimationFrame(()=> requestAnimationFrame(()=> p.classList.add('show')));

    // create a small burst of hearts
    for(let i=0;i<10;i++){
      setTimeout(()=> createHeart({left: 30 + Math.random()*40, size: 18+Math.random()*26, duration: 3+Math.random()*2}), i*80);
    }

    // show modal
    modal.setAttribute('aria-hidden','false');
  }

  revealBtn.addEventListener('click', ()=>{
    // button animation: quick scale
    revealBtn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:360,easing:'ease-out'});
    showSecret();
  });

  modalClose.addEventListener('click', ()=>{
    modal.setAttribute('aria-hidden','true');
  });

  // Close modal by clicking outside panel
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // Accessibility: close with Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
      modal.setAttribute('aria-hidden','true');
    }
  });

})();
