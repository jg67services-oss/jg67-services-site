/* Ambiance de Noël JG67 (20 nov. → 6 janv.) : quelques flocons + un traîneau qui traverse l'écran une fois par visite.
   Décor seul : aucun clic capté, rien si l'utilisateur réduit les animations, transform/opacity uniquement (pas de reflow). */
(function () {
  var d = new Date(), m = d.getMonth() + 1, j = d.getDate();
  if (!((m === 11 && j >= 20) || m === 12 || (m === 1 && j <= 6))) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var mobile = innerWidth < 700, n = mobile ? 9 : 18;
  var css = '.noel{position:fixed;inset:0;z-index:55;pointer-events:none;overflow:hidden;contain:strict}' +
    '.noel i{position:absolute;top:-12px;border-radius:50%;background:#fff;box-shadow:0 0 6px rgba(216,189,138,.9);opacity:0;will-change:transform;animation:noel-f linear infinite}' +
    '@keyframes noel-f{0%{transform:translate3d(0,0,0);opacity:0}8%{opacity:var(--o)}90%{opacity:var(--o)}100%{transform:translate3d(var(--x),105vh,0);opacity:0}}' +
    '.noel svg{position:absolute;left:0;top:' + (mobile ? '84px' : '110px') + ';width:' + (mobile ? '110px' : '170px') + ';height:auto;opacity:.92;filter:drop-shadow(0 2px 6px rgba(14,30,42,.35));will-change:transform;animation:noel-t ' + (mobile ? '7s' : '10s') + ' cubic-bezier(.4,.1,.6,.9) 1.2s 1 both}' +
    '@keyframes noel-t{0%{transform:translate3d(-200px,40px,0) rotate(-7deg)}50%{transform:translate3d(50vw,-22px,0) rotate(-2deg)}100%{transform:translate3d(calc(100vw + 60px),26px,0) rotate(-8deg)}}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  var c = document.createElement('div'); c.className = 'noel'; c.setAttribute('aria-hidden', 'true');
  for (var k = 0; k < n; k++) {
    var f = document.createElement('i'), t = 2 + Math.random() * 3.5;
    f.style.cssText = 'left:' + (Math.random() * 100) + '%;width:' + t + 'px;height:' + t + 'px;--o:' + (0.45 + Math.random() * 0.45).toFixed(2) +
      ';--x:' + Math.round(Math.random() * 80 - 40) + 'px;animation-duration:' + (9 + Math.random() * 9).toFixed(1) + 's;animation-delay:-' + (Math.random() * 14).toFixed(1) + 's';
    c.appendChild(f);
  }
  var vu = false; try { vu = sessionStorage.getItem('jg67-traineau') === '1'; sessionStorage.setItem('jg67-traineau', '1'); } catch (e) {}
  if (!vu) {
    c.insertAdjacentHTML('beforeend',
      '<svg viewBox="0 0 340 90" fill="#D8BD8A" stroke="#D8BD8A" stroke-linecap="round" stroke-linejoin="round">' +
      /* traîneau + Père Noël */
      '<path d="M22 46c0 14 8 20 22 20h46c10 0 16-6 16-16V38H78c-6 0-8 8-14 8H22z" stroke="none"/>' +
      '<path d="M14 78h92c10 0 16-4 18-12M40 66v12M88 66v12" fill="none" stroke-width="3"/>' +
      '<circle cx="62" cy="26" r="8" stroke="none"/><path d="M54 22c2-10 12-14 20-8l8 8-10-2z" stroke="none"/><circle cx="83" cy="22" r="3" fill="#fff" stroke="none"/>' +
      '<path d="M50 44c0-9 6-13 13-13s13 5 13 13z" stroke="none"/>' +
      /* rênes */
      '<path d="M76 40c40-10 90-8 140 0M216 40c20 2 38 0 58-4" fill="none" stroke-width="1.5" opacity=".8"/>' +
      /* deux rennes */
      '<g id="r"><path d="M150 44c6-6 22-7 30-2l10-10 6 2-6 12c-2 6-8 8-14 8h-22c-4 0-6-4-4-10z" stroke="none"/>' +
      '<path d="M156 52l-8 18M164 54l2 18M182 52l10 16M176 54l-2 18M194 32l-2-10m2 10l6-9m-6 3l-7-4" fill="none" stroke-width="2.5"/></g>' +
      '<use href="#r" x="66" y="-6"/>' +
      /* poussière d'étoiles */
      '<g fill="#fff" stroke="none" opacity=".9"><circle cx="8" cy="52" r="1.6"/><circle cx="2" cy="64" r="1.1"/><circle cx="12" cy="68" r="1"/></g>' +
      '</svg>');
    c.lastChild.addEventListener('animationend', function () { this.remove(); });
  }
  (document.body || document.documentElement).appendChild(c);
})();
