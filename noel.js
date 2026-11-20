/* Ambiance de Noël JG67 (20 nov. → 6 janv.) : flocons, scintillements, étoile filante et traîneau du Père Noël.
   Décor seul : aucun clic capté, rien si l'utilisateur réduit les animations, transform/opacity uniquement.
   Traîneau : au plus une fois toutes les 2 min 30, mémorisé entre les pages. Essai immédiat : ajouter ?noel=go à l'adresse. */
(function () {
  var essai = /[?&]noel=go/.test(location.search);
  var d = new Date(), m = d.getMonth() + 1, j = d.getDate();
  if (!essai && !((m === 11 && j >= 20) || m === 12 || (m === 1 && j <= 6))) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var nav = navigator, mobile = innerWidth < 700;
  /* Appareil modeste ou économie de données : flocons seuls, traîneau sans traînée */
  var leger = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) || (nav.deviceMemory && nav.deviceMemory <= 2) ||
    (nav.connection && nav.connection.saveData);
  var n = leger ? 6 : mobile ? 10 : 20, R = Math.random;
  var ETOILE = 'clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%)';

  var css = '.noel{position:fixed;inset:0;z-index:45;pointer-events:none;overflow:hidden;contain:strict}' +
    '.noel>*{position:absolute;will-change:transform,opacity}' +
    /* flocons */
    '.noel i{top:-12px;border-radius:50%;background:#fff;box-shadow:0 0 6px rgba(216,189,138,.9);opacity:0;animation:noel-f linear infinite}' +
    '@keyframes noel-f{0%{transform:translate3d(0,0,0);opacity:0}8%{opacity:var(--o)}90%{opacity:var(--o)}100%{transform:translate3d(var(--x),105vh,0);opacity:0}}' +
    /* scintillement */
    '.noel u{' + ETOILE + ';background:#F3E3C0;opacity:0;animation:noel-s 1.9s ease-in-out 1 both}' +
    '@keyframes noel-s{0%,100%{transform:scale(0) rotate(0);opacity:0}50%{transform:scale(1) rotate(45deg);opacity:.9}}' +
    /* étoile filante */
    '.noel s{height:2px;width:' + (mobile ? 80 : 130) + 'px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(243,227,192,.7) 70%,#fff);opacity:0;animation:noel-e 1s ease-out 1 both}' +
    '@keyframes noel-e{0%{transform:translate3d(0,0,0) rotate(20deg);opacity:0}20%{opacity:1}100%{transform:translate3d(280px,102px,0) rotate(20deg);opacity:0}}' +
    /* traîneau : trajectoire (div) + balancement (svg) + galop (rennes) */
    '.noel .tr{left:0;top:' + (mobile ? 74 : 92) + 'px;width:' + (mobile ? 180 : 280) + 'px;animation:noel-t ' + (mobile ? '4.8s' : '5.6s') + ' cubic-bezier(.42,.08,.58,.94) 1 both}' +
    '@keyframes noel-t{0%{transform:translate3d(-110%,34px,0)}55%{transform:translate3d(50vw,-8px,0)}100%{transform:translate3d(100vw,12px,0)}}' +
    '.noel .tr svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 3px 8px rgba(14,30,42,.4));animation:noel-b 1.4s ease-in-out infinite alternate}' +
    '@keyframes noel-b{from{transform:translateY(-5px) rotate(-3.5deg)}to{transform:translateY(6px) rotate(1deg)}}' +
    '.noel .rn{animation:noel-g .4s ease-in-out infinite alternate}.noel .r2{animation-delay:-.14s}.noel .r3{animation-delay:-.27s}' +
    '@keyframes noel-g{from{transform:translateY(1.5px)}to{transform:translateY(-3px)}}' +
    /* traînée de poussière de neige */
    '.noel b{border-radius:50%;background:#fff;box-shadow:0 0 7px 1px rgba(235,215,174,.95);animation:noel-p var(--t) ease-out 1 both}' +
    '.noel b.e{border-radius:0;box-shadow:none;background:#F3E3C0;' + ETOILE + '}' +
    '@keyframes noel-p{0%{transform:translate3d(0,0,0) scale(1);opacity:.95}100%{transform:translate3d(var(--x),var(--y),0) scale(.15) rotate(90deg);opacity:0}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var c = document.createElement('div'); c.className = 'noel'; c.setAttribute('aria-hidden', 'true');
  for (var k = 0; k < n; k++) {
    var t = 2 + R() * 3.5;
    add('i', 'left:' + (R() * 100) + '%;width:' + t + 'px;height:' + t + 'px;--o:' + (0.45 + R() * 0.45).toFixed(2) +
      ';--x:' + Math.round(R() * 80 - 40) + 'px;animation-duration:' + (9 + R() * 9).toFixed(1) + 's;animation-delay:-' + (R() * 14).toFixed(1) + 's', true);
  }
  (document.body || document.documentElement).appendChild(c);

  /* élément éphémère, retiré à la fin de son animation (les flocons, eux, restent) */
  function add(tag, style, garde, cls) {
    var e = document.createElement(tag); if (cls) e.className = cls; e.style.cssText = style;
    if (!garde) e.addEventListener('animationend', function () { e.remove(); });
    c.appendChild(e); return e;
  }
  function boucle(fn, min, max, premier) {
    setTimeout(function tic() { if (!document.hidden) fn(); setTimeout(tic, min + R() * (max - min)); }, premier);
  }

  if (!leger) {
    boucle(function () { /* scintillement */
      var t = 8 + R() * 8;
      add('u', 'left:' + (4 + R() * 92) + '%;top:' + (8 + R() * 62) + '%;width:' + t + 'px;height:' + t + 'px');
    }, 2600, 5200, 1800);
    boucle(function () { /* étoile filante */
      add('s', 'left:' + (8 + R() * 50) + '%;top:' + (9 + R() * 20) + '%');
    }, 38000, 62000, essai ? 7000 : 9000);
  }

  /* ---------- Traîneau ---------- */
  var CLE = 'jg67-traineau-t', PAUSE = 150000, mem = 0;
  function dernier() { try { return +localStorage.getItem(CLE) || mem; } catch (e) { return mem; } }
  function noter() { mem = Date.now(); try { localStorage.setItem(CLE, mem); } catch (e) {} }

  var RENNE = '<path d="M150 50c8-7 26-8 36-3l9-11c1-3 6-4 8-1l2 5c0 3-3 5-6 5l-5 9c-3 6-9 8-16 8h-20c-6 0-10-6-8-12z"/>' +
    '<path d="M157 60l-11 17M165 62l3 18M180 61l-5 18M187 58l12 15" fill="none" stroke="url(#noel-or)" stroke-width="2.6"/>' +
    '<path d="M199 33l-2-11m0 4l6-7m-5 10l-7-5" fill="none" stroke="url(#noel-or)" stroke-width="1.8"/>';
  var SVG = '<svg viewBox="0 0 345 100" fill="url(#noel-or)" stroke-linecap="round" stroke-linejoin="round">' +
    '<defs><linearGradient id="noel-or" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100"><stop offset="0" stop-color="#F0DDB4"/><stop offset="1" stop-color="#B7935B"/></linearGradient></defs>' +
    /* hotte et cadeaux */
    '<rect x="29" y="10" width="12" height="12" rx="1" fill="#fff"/><path d="M35 10v12M29 16h12" fill="none" stroke="#B7935B" stroke-width="1.6"/>' +
    '<rect x="42" y="7" width="10" height="11" rx="1" transform="rotate(14 47 12)" fill="#E9D3A4" stroke="#fff" stroke-width="1"/>' +
    '<path d="M28 60c-9-12-7-30 5-35 7-4 17 0 20 10 2 9 0 18-2 25z" fill="#B7935B"/><path d="M30 27c6 3 14 3 20-1" fill="none" stroke="#fff" stroke-width="1.6" opacity=".85"/>' +
    /* traîneau */
    '<path d="M16 40c-2 22 8 38 28 38h54c12 0 18-8 18-18V50H90c-10 0-12 10-22 10H40c-10 0-14-10-14-20z"/>' +
    '<path d="M12 91h92c14 0 22-8 22-20M38 78v13M88 78v13" fill="none" stroke="url(#noel-or)" stroke-width="3"/>' +
    '<path d="M24 66h86" fill="none" stroke="#fff" stroke-width="1.4" opacity=".55"/>' +
    /* Père Noël */
    '<path d="M54 60c0-16 6-24 16-24s16 8 16 24z"/><path d="M80 46l17-2" fill="none" stroke="url(#noel-or)" stroke-width="4.5"/>' +
    '<circle cx="71" cy="28" r="7.5" fill="#F0DDB4"/><path d="M63.5 28c1 11 14 11 15 0-4 3-11 3-15 0z" fill="#fff"/>' +
    '<path d="M63 25c1-11 13-15 19-7l6 6-10-2c-4-1-10 0-15 3z"/><path d="M63 25.5c5-3 11-3.5 16-2.5" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="88.5" cy="24.5" r="2.8" fill="#fff"/>' +
    /* rênes */
    '<path d="M97 44q52-10 98 2m0 0q34-8 62-5m0 0q34-8 62-4" fill="none" stroke="#F0DDB4" stroke-width="1.1" opacity=".8"/>' +
    /* trois rennes, le premier au nez rouge */
    '<g class="rn">' + RENNE + '</g>' +
    '<g transform="translate(62 -5)"><g class="rn r2">' + RENNE + '</g></g>' +
    '<g transform="translate(124 -9)"><g class="rn r3">' + RENNE + '<circle cx="205" cy="39" r="2.3" fill="#C8463C"/></g></g>' +
    '</svg>';

  function vol() {
    noter();
    var tr = document.createElement('div'); tr.className = 'tr'; tr.innerHTML = SVG; c.appendChild(tr);
    var trainee = leger ? 0 : setInterval(function () {
      var r = tr.getBoundingClientRect(); if (r.right < 0) return;
      for (var q = 0; q < 2; q++) {
        var t = 2 + R() * (mobile ? 3 : 4.5), et = R() < 0.3; if (et) t *= 2.2;
        add('b', 'left:' + (r.left + r.width * (0.02 + R() * 0.1)) + 'px;top:' + (r.top + r.height * (0.45 + R() * 0.5)) + 'px;width:' + t + 'px;height:' + t +
          'px;--x:' + Math.round(-10 - R() * 40) + 'px;--y:' + Math.round(8 + R() * 38) + 'px;--t:' + (0.9 + R() * 0.9).toFixed(2) + 's', false, et ? 'e' : '');
      }
    }, mobile ? 90 : 55);
    tr.addEventListener('animationend', function (e) {
      if (e.target !== tr) return;
      clearInterval(trainee); tr.remove(); prevoir(false);
    });
  }
  function prevoir(tout_de_suite) {
    var attente = tout_de_suite ? 700 : Math.max(1400, dernier() + PAUSE - Date.now());
    setTimeout(function () {
      if (document.hidden) { document.addEventListener('visibilitychange', function v() { document.removeEventListener('visibilitychange', v); prevoir(false); }); return; }
      if (!tout_de_suite && Date.now() - dernier() < PAUSE) return prevoir(false);
      vol();
    }, attente);
  }
  prevoir(essai);
})();
