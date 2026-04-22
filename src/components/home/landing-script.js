/* ── SHOPCOLL: Editorial stage swap ── */
(function(){
  const root = document.getElementById('scEditorial');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.sc__slide'));
  const rows   = Array.from(root.querySelectorAll('.sc__row'));
  if (!slides.length || !rows.length) return;

  function activate(id){
    slides.forEach(s => s.classList.toggle('is-active', s.dataset.id === id));
    rows.forEach(r => r.classList.toggle('is-active', r.dataset.target === id));
  }

  rows.forEach(r => {
    r.addEventListener('click', () => activate(r.dataset.target));
  });
})();

/* ── SOCIALFEED: Carousel ── */
(function(){
  const track  = document.getElementById('sfTrack');
  const dotsEl = document.getElementById('sfDots');
  if (!track) return;
  const cards = Array.from(track.children);
  const TOTAL = cards.length;
  const GAP = 16;
  let idx = 0, touchSX = 0;

  function vis(){
    const w = window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 860) return 3;
    return 5;
  }
  const maxI = () => Math.max(0, TOTAL - vis());

  function buildDots(){
    dotsEl.innerHTML = '';
    const count = maxI() + 1;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('button');
      b.className = 'sf__dot' + (i === idx ? ' active' : '');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', () => { idx = i; move(); });
      dotsEl.appendChild(b);
    }
  }
  function syncDots(){
    dotsEl.querySelectorAll('.sf__dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  function move(){
    idx = Math.max(0, Math.min(idx, maxI()));
    const cardW = cards[0].offsetWidth + GAP;
    track.style.transform = 'translateX(-' + (idx * cardW) + 'px)';
    syncDots();
  }

  document.getElementById('sfPrev').addEventListener('click', e => { e.stopPropagation(); idx = Math.max(0, idx - 1); move(); });
  document.getElementById('sfNext').addEventListener('click', e => { e.stopPropagation(); idx = Math.min(maxI(), idx + 1); move(); });

  track.addEventListener('touchstart', e => { touchSX = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchSX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) {
      idx = diff > 0 ? Math.min(maxI(), idx + 1) : Math.max(0, idx - 1);
      move();
    }
  }, { passive: true });

  window.addEventListener('resize', () => { idx = Math.min(idx, maxI()); buildDots(); move(); });

  buildDots();
  move();

  /* ── Video Lightbox ── */
  const modal      = document.getElementById('sfModal');
  const modalVideo = document.getElementById('sfModalVideo');
  const modalClose = document.getElementById('sfModalClose');
  let dragSX = 0, dragSY = 0, dragMoved = false;

  function openModal(src) {
    if (!src) return;
    modalVideo.src = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalVideo.play().catch(() => {});
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    const src = card.getAttribute('data-video');
    if (!src) return;
    card.addEventListener('pointerdown', e => {
      dragSX = e.clientX; dragSY = e.clientY; dragMoved = false;
    });
    card.addEventListener('pointermove', e => {
      if (Math.abs(e.clientX - dragSX) > 6 || Math.abs(e.clientY - dragSY) > 6) dragMoved = true;
    });
    card.addEventListener('click', e => {
      if (dragMoved) return;
      e.preventDefault();
      openModal(src);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
})();
