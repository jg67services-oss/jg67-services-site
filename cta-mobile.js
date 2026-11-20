/* Barre d'action mobile JG67 : « Devis sous 24h » + WhatsApp, visible après le premier écran, masquée près du formulaire. */
(function () {
  if (!window.matchMedia || !matchMedia('(max-width:700px)').matches) return;
  var wa = document.querySelector('a.wa'); if (!wa) return;
  var form = document.getElementById('devis');
  var css = '.cta-mob{position:fixed;left:0;right:0;bottom:0;z-index:59;display:flex;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:rgba(14,30,42,.96);box-shadow:0 -8px 24px -12px rgba(0,0,0,.5);transform:translateY(110%);transition:transform .35s cubic-bezier(.22,.61,.21,1)}' +
    '.cta-mob.on{transform:none}' +
    '.cta-mob a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;min-height:46px;border-radius:3px;font:600 14px/1.1 Outfit,-apple-system,sans-serif;letter-spacing:.02em;text-decoration:none;text-align:center}' +
    '.cta-mob .d{background:#B7935B;color:#0E1E2A}.cta-mob .w{background:#25D366;color:#0B3D1E;flex:0 0 42%}' +
    '.cta-mob svg{width:18px;height:18px;fill:currentColor}' +
    'body.cta-on a.wa{opacity:0;pointer-events:none}body.cta-on{padding-bottom:70px}' +
    '@media(prefers-reduced-motion:reduce){.cta-mob{transition:none}}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  var b = document.createElement('div'); b.className = 'cta-mob';
  b.innerHTML = '<a class="d" href="' + (form ? '#devis' : '/contact#devis') + '">Devis sous 24h</a>' +
    '<a class="w" target="_blank" rel="noopener" aria-label="Écrire à JG67 sur WhatsApp" href="' + wa.getAttribute('href') + '">' +
    '<svg viewBox="0 0 32 32" aria-hidden="true">' + (wa.querySelector('svg') ? wa.querySelector('svg').innerHTML : '') + '</svg>WhatsApp</a>';
  document.body.appendChild(b);
  var pres = false;
  if (form && 'IntersectionObserver' in window) new IntersectionObserver(function (e) { pres = e[0].isIntersecting; maj(); }).observe(form);
  function maj() { var on = scrollY > 420 && !pres; b.classList.toggle('on', on); document.body.classList.toggle('cta-on', on); }
  addEventListener('scroll', maj, { passive: true }); maj();
})();
