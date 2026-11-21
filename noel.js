/* Ambiance de Noël JG67 (20 nov. → 6 janv.) : flocons, scintillements, étoile filante et traîneau du Père Noël.
   Décor seul : aucun clic capté, rien si l'utilisateur réduit les animations, transform/opacity uniquement.
   Traîneau : au plus une fois toutes les 2 min 30, mémorisé entre les pages. Essai immédiat : ajouter ?noel=go à l'adresse.
   Histoire des lutins JG67 (une fois par session) : voir plus bas. Démo : ?noel=histoire, ou jg67NoelHistoire() dans la console. */
(function () {
  var demo = /[?&]noel=histoire/.test(location.search), essai = demo || /[?&]noel=go/.test(location.search);
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
  var CORPS = '<path d="M54 60c0-16 6-24 16-24s16 8 16 24z"/>';
  var TETE = '<circle cx="71" cy="28" r="7.5" fill="#F0DDB4"/><path d="M63.5 28c1 11 14 11 15 0-4 3-11 3-15 0z" fill="#fff"/>' +
    '<path d="M63 25c1-11 13-15 19-7l6 6-10-2c-4-1-10 0-15 3z"/><path d="M63 25.5c5-3 11-3.5 16-2.5" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="88.5" cy="24.5" r="2.8" fill="#fff"/>';
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
    CORPS + '<path d="M80 46l17-2" fill="none" stroke="url(#noel-or)" stroke-width="4.5"/>' +
    TETE +
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
    return tr;
  }
  function prevoir(tout_de_suite) {
    var attente = tout_de_suite ? 700 : Math.max(1400, dernier() + PAUSE - Date.now());
    setTimeout(function () {
      if (document.hidden) { document.addEventListener('visibilitychange', function v() { document.removeEventListener('visibilitychange', v); prevoir(false); }); return; }
      if (!tout_de_suite && Date.now() - dernier() < PAUSE) return prevoir(false);
      vol();
    }, attente);
  }
  /* ---------- Histoire de Noël : « Même le Père Noël fait appel aux experts du ménage » ----------
     Une fois par session, dans une petite vignette au coin bas gauche (aucun clic capté, rien ne couvre le texte ni les boutons) :
     1. le traîneau passe et sa neige se dépose ; 2. deux lutins JG67 balaient et font briller la vitre ;
     3. le Père Noël sort de derrière le toit et approuve, une étoile s'allume ; 4. la signature. Environ 15 s. */
  var VU = 'jg67-noel-histoire', OR = '#C9A66B', CREME = '#F6F4EF', PEAU = '#F6D9B8', NUIT = '#0E1E2A';
  var CSS_H = '.noel .sc{border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#15324C 0,#0E1E2A 80%);border:1px solid rgba(183,147,91,.45);box-shadow:0 18px 40px -16px rgba(14,30,42,.75);animation:nh-v 14.8s ease .4s 1 both}' +
    '.noel .sc svg{display:block;width:100%;height:auto;animation:nh-dim .6s ease 11.6s 1 both}' +
    '.noel .sc .fb{transform-box:fill-box;transform-origin:50% 100%}.noel .sc .fc{transform-box:fill-box;transform-origin:50% 50%}' +
    '.noel .sc .ph{position:absolute;inset:0;margin:0;max-width:none;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 ' + (mobile ? 14 : 28) + 'px;' +
    'font:italic 500 ' + (mobile ? 15 : 21) + 'px/1.25 "Cormorant Garamond",Georgia,serif;letter-spacing:.01em;color:#F3E3C0;animation:nh-ph 3.1s ease 11.8s 1 both}' +
    '.noel b.d{animation-name:nh-dep;animation-timing-function:cubic-bezier(.3,0,.7,.7)}' +
    '@keyframes nh-v{0%{opacity:0;transform:translate3d(0,14px,0)}5%,95%{opacity:1;transform:none}100%{opacity:0;transform:translate3d(0,8px,0)}}' +
    '@keyframes nh-dim{to{opacity:.14}}' +
    '@keyframes nh-ph{0%{opacity:0;transform:translateY(6px)}16%,82%{opacity:1;transform:none}100%{opacity:0;transform:none}}' +
    '@keyframes nh-dep{0%{transform:translate3d(0,0,0);opacity:.95}80%{opacity:.9}100%{transform:translate3d(var(--x),var(--y),0) scale(.5);opacity:0}}' +
    '@keyframes nh-fl{0%{transform:translateY(0);opacity:0}15%,85%{opacity:.95}100%{transform:translateY(var(--y));opacity:0}}' +
    '@keyframes nh-ap{from{opacity:0}to{opacity:1}}' +
    '@keyframes nh-ma{from{transform:scaleY(0);opacity:0}to{transform:none;opacity:.97}}' +
    '@keyframes nh-md{to{transform:translate(16px,-5px) scale(.15);opacity:0}}' +
    '@keyframes nh-pf{0%{opacity:0;transform:none}15%{opacity:.9}100%{opacity:0;transform:translate(var(--x),var(--y)) scale(.4)}}' +
    '@keyframes nh-x1{0%{transform:translateX(-40px)}15%{transform:translateX(16px)}100%{transform:translateX(158px)}}' +
    '@keyframes nh-x2{from{transform:translateX(-50px)}to{transform:translateX(226px)}}' +
    '@keyframes nh-j{0%,100%{transform:rotate(0)}25%{transform:rotate(22deg)}75%{transform:rotate(-22deg)}}' +
    '@keyframes nh-bob{from{transform:translateY(0)}to{transform:translateY(-1.6px)}}' +
    '@keyframes nh-hop{0%,100%{transform:none}30%{transform:translateY(-9px)}55%{transform:none}75%{transform:translateY(-4px)}}' +
    '@keyframes nh-ba{from{transform:rotate(10deg)}to{transform:rotate(-14deg)}}' +
    '@keyframes nh-ca{0%,100%{transform:none}25%{transform:translate(2px,-3px)}50%{transform:translate(4px,0)}75%{transform:translate(2px,3px)}}' +
    '@keyframes nh-vs{from{transform:translateX(-16px)}to{transform:translateX(36px)}}' +
    '@keyframes nh-pn{0%{transform:translateY(70px)}22%{transform:translateY(-4px)}28%{transform:translateY(0)}40%{transform:translateY(0) rotate(5deg)}48%{transform:translateY(0) rotate(-2deg)}56%,84%{transform:translateY(0) rotate(0)}100%{transform:translateY(70px)}}' +
    '@keyframes nh-po{from{opacity:0;transform:translateY(6px) rotate(35deg)}to{opacity:1;transform:none}}' +
    '@keyframes nh-st{0%{transform:scale(0) rotate(0);opacity:0}55%{transform:scale(1.25) rotate(50deg);opacity:1}100%{transform:scale(1) rotate(90deg);opacity:1}}';

  function deja() { try { return sessionStorage.getItem(VU); } catch (e) { return '1'; } }
  function an(nom, duree, delai, reste) { return 'animation:' + nom + ' ' + duree + 's ' + (reste || 'ease-in-out') + ' ' + delai + 's both'; }

  /* Lutin en tenue JG67 (crème et champagne), pieds en (0,0), tourné vers la droite.
     marche = [animation de déplacement, départ en s], pas = nombre de foulées, saut = instant du petit saut de joie. */
  function lutin(marche, pas, saut, bras, traine) {
    function jambe(x, d) {
      return '<g style="transform-origin:' + x + 'px -14px;animation:nh-j .3s linear ' + (marche[1] + d) + 's ' + pas + ' both">' +
        '<path d="M' + x + ' -14v11" fill="none" stroke="' + OR + '" stroke-width="3.6"/><path d="M' + (x - 3) + ' 0v-3.2h5.5l5.5 3.2z" fill="' + OR + '"/></g>';
    }
    return '<g style="' + marche[0] + '"><g transform="translate(0 128) scale(1.1)">' + (traine || '') +
      '<g style="' + an('nh-hop', 0.9, saut, 'ease-out') + '"><g style="animation:nh-bob .3s ease-in-out infinite alternate">' +
      jambe(-3.5, 0) + jambe(3.5, 0.15) +
      '<path d="M-9 -13q-2.5-17 9-18.5 11.5 1.5 9 18.5z" fill="' + CREME + '"/>' +
      '<path d="M-9.3 -18h18.6" fill="none" stroke="' + OR + '" stroke-width="2.4"/><path d="M-6 -29.5l3 3 3-3 3 3 3-3" fill="none" stroke="' + OR + '" stroke-width="1.6"/>' +
      '<path d="M-5.5 -39l-5.5-3.5 4 6z" fill="' + PEAU + '"/><circle cx="1" cy="-38" r="7.2" fill="' + PEAU + '"/>' +
      '<circle cx="4.2" cy="-39" r="1" fill="' + NUIT + '"/><path d="M3 -35.2q2.2 1.6 4 .2" fill="none" stroke="' + NUIT + '" stroke-width=".9"/><circle cx="6.2" cy="-36.6" r="1.3" fill="#C8463C" opacity=".35"/>' +
      '<path d="M-6.5 -43.5q1-12-2.5-16.5 12 0 17.5 16.5z" fill="' + OR + '"/><path d="M-7 -43.5h16" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="-9.5" cy="-60.5" r="2.4" fill="#fff"/>' +
      bras + '</g></g></g></g>';
  }

  function histoire() {
    if (c.querySelector('.sc')) return;
    if (document.hidden) { document.addEventListener('visibilitychange', function v() { document.removeEventListener('visibilitychange', v); histoire(); }); return; }
    /* Sur mobile, tant que le bandeau cookies est affiché, la vignette couvrirait le texte : on attend qu'il soit fermé (sauf en démo) */
    var cb = document.getElementById('jg67-cookie-banner');
    if (mobile && !demo && cb && cb.offsetHeight) { setTimeout(histoire, 4000); return; }
    try { sessionStorage.setItem(VU, '1'); } catch (e) {}
    if (!histoire.css) { histoire.css = 1; var s2 = document.createElement('style'); s2.textContent = CSS_H; document.head.appendChild(s2); }
    var tr = vol(), k, q, h = '';

    /* Scène 1 : la neige du traîneau tombe dans la vignette et se dépose (toit, cheminée, quatre congères) */
    for (k = 0; k < 13; k++)
      h += '<circle cx="' + Math.round(16 + R() * 300) + '" cy="-4" r="' + (1.2 + R() * 1.4).toFixed(1) + '" fill="#fff" style="--y:' + Math.round(96 + R() * 30) + 'px;' + an('nh-fl', (1.4 + R() * 0.6).toFixed(2), (1.2 + R() * 2.6).toFixed(2), 'ease-in') + '"/>';
    var balai = [5.65, 6.7, 7.75, 8.6];
    for (k = 0; k < 4; k++) {
      var cx = 50 + 45 * k;
      h += '<path class="fb" d="M' + (cx - 24) + ' 128q4-12 14-10 6-8 14-4 9-3 12 6 6 2 8 8z" fill="#fff" style="animation:nh-ma 1.8s ease-out ' + (2 + k * 0.25) + 's both,nh-md .5s ease-in ' + balai[k] + 's forwards"/>';
      for (q = 0; q < 3; q++)
        h += '<circle cx="' + Math.round(cx - 6 + R() * 16) + '" cy="' + Math.round(116 + R() * 8) + '" r="' + (1.3 + R()).toFixed(1) + '" fill="#fff" style="--x:' + Math.round(8 + R() * 16) + 'px;--y:' + Math.round(-6 - R() * 14) + 'px;' + an('nh-pf', 0.7, (balai[k] + q * 0.07).toFixed(2), 'ease-out') + '"/>';
    }

    var svg = '<svg viewBox="0 0 340 150" stroke-linecap="round" stroke-linejoin="round">' +
      '<defs><linearGradient id="nh-or" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="110"><stop offset="0" stop-color="#F0DDB4"/><stop offset="1" stop-color="#B7935B"/></linearGradient>' +
      '<clipPath id="nh-vitre"><rect x="238" y="90" width="24" height="22" rx="2"/></clipPath>' +
      '<clipPath id="nh-ciel"><path d="M186 0h154v78h-24L267 38 218 78h-32z"/></clipPath></defs>' +
      /* ciel et sol */
      '<g fill="#F3E3C0" opacity=".5"><circle cx="28" cy="24" r="1.2"/><circle cx="74" cy="12" r=".9"/><circle cx="122" cy="30" r="1.1"/><circle cx="168" cy="14" r=".9"/><circle cx="326" cy="52" r="1"/></g>' +
      '<path d="M0 128h340v22H0z" fill="#fff" opacity=".07"/><path d="M0 128h340" fill="none" stroke="#B7935B" stroke-width="1" opacity=".55"/>' +
      /* Scène 3 : le Père Noël, caché derrière le toit, monte, hoche la tête et lève le pouce */
      '<g clip-path="url(#nh-ciel)"><g style="transform-origin:250px 60px;' + an('nh-pn', 2.7, 9) + '"><g transform="translate(122.2 -18.4) scale(1.8)" fill="url(#nh-or)">' + CORPS +
      '<g style="transform-origin:62px 46px;' + an('nh-po', 0.45, 9.9, 'cubic-bezier(.3,1.5,.5,1)') + '"><path d="M62 47l-9-10" fill="none" stroke="url(#nh-or)" stroke-width="4.5"/><circle cx="52.5" cy="36" r="3.3" fill="#F0DDB4"/><path d="M52.5 33.5v-5.5" fill="none" stroke="#F0DDB4" stroke-width="2.6"/></g>' +
      TETE + '</g></g></g>' +
      /* le logement : petite maison à colombages */
      '<rect x="290" y="44" width="11" height="24" fill="#8E6F3F"/>' +
      '<path d="M228 74h78v54h-78z" fill="' + CREME + '"/><path d="M228 84h78M268 84v44M228 118h40" fill="none" stroke="#B7935B" stroke-width="2"/>' +
      '<path d="M218 78L267 38l49 40z" fill="url(#nh-or)"/>' +
      '<rect x="277" y="96" width="18" height="32" rx="2" fill="#1B3243"/><circle cx="291.5" cy="114" r="1.4" fill="#F0DDB4"/><circle cx="286" cy="104" r="3.4" fill="none" stroke="#B7935B" stroke-width="1.6"/><circle cx="286" cy="107.4" r="1.1" fill="#C8463C"/>' +
      /* la vitre : terne, puis éclairée et brillante après le chiffon */
      '<rect x="238" y="90" width="24" height="22" rx="2" fill="#5E7482"/><rect x="238" y="90" width="24" height="22" rx="2" fill="#F3E3C0" style="' + an('nh-ap', 1.4, 7.2) + '"/>' +
      '<path d="M250 90v22M238 101h24" fill="none" stroke="' + NUIT + '" stroke-width="1.3" opacity=".55"/>' +
      '<g clip-path="url(#nh-vitre)"><path d="M232 114l8-26h5l-8 26z" fill="#fff" opacity=".9" style="' + an('nh-vs', 0.7, 8.5, 'ease-out') + '"/></g>' +
      '<rect x="238" y="90" width="24" height="22" rx="2" fill="none" stroke="#B7935B" stroke-width="1.6"/>' +
      '<path class="fc" d="M259 84l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z" fill="#fff" style="' + an('nh-st', 0.9, 8.9, 'ease-out') + '"/>' +
      /* neige sur le toit et la cheminée */
      '<g fill="#fff" style="' + an('nh-ap', 2, 2) + '"><path d="M218 78L267 38l49 40h-10q-2-5-6-3l-33-28-33 28q-4-2-6 3z"/><rect x="288" y="41" width="15" height="5" rx="2.5"/></g>' +
      h +
      /* Scène 2 : le lutin au chiffon (seau JG67) puis le lutin au balai */
      lutin([an('nh-x2', 1.5, 4.3, 'cubic-bezier(.3,.6,.4,1)'), 4.3], 5, 10.42,
        '<g style="animation:nh-ca .5s linear 5.8s 6 both"><path d="M3 -27l11 -3" fill="none" stroke="' + CREME + '" stroke-width="3.4"/><rect x="12.5" y="-35" width="8" height="7" rx="2" fill="#fff"/></g>',
        '<path d="M-32 -15q10-11 20 0" fill="none" stroke="#F0DDB4" stroke-width="1.2"/><path d="M-33 -15h22l-3 15h-16z" fill="' + OR + '"/>' +
        '<text x="-22" y="-4.6" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-size="7.4" font-weight="700" fill="' + NUIT + '">JG67</text>') +
      lutin([an('nh-x1', 4, 4.8, 'linear'), 4.8], 13, 10.3,
        '<g style="transform-origin:8px -24px;animation:nh-ba .36s ease-in-out 5.4s 10 alternate both"><path d="M6 -41L17 -4" fill="none" stroke="#E4CFA3" stroke-width="1.8"/>' +
        '<path d="M12.5 -7h9l2.5 7h-13z" fill="' + OR + '"/><path d="M15.5 -6v5M19 -6v5" fill="none" stroke="' + NUIT + '" stroke-width=".6" opacity=".5"/>' +
        '<path d="M2 -27l8.5 5" fill="none" stroke="' + CREME + '" stroke-width="3.4"/><circle cx="11" cy="-21.5" r="2" fill="' + PEAU + '"/></g>') +
      /* l'étoile du logement impeccable */
      '<path class="fc" d="M302 9l3.2 9.8 9.8 3.2-9.8 3.2-3.2 9.8-3.2-9.8-9.8-3.2 9.8-3.2z" fill="#F3E3C0" style="' + an('nh-st', 1.5, 10.1, 'ease-out') + '"/>' +
      '</svg>';

    /* Placement : coin bas gauche, au-dessus du bandeau cookies s'il est affiché et de la barre d'action mobile */
    var gauche = mobile ? 12 : 24, large = mobile ? 220 : 340, bas = mobile ? 80 : 24;
    if (cb && cb.offsetHeight && cb.getBoundingClientRect().left < gauche + large + 12) bas = Math.max(bas, innerHeight - cb.getBoundingClientRect().top + 14);
    var sc = document.createElement('div'); sc.className = 'sc';
    sc.style.cssText = 'left:' + gauche + 'px;bottom:' + bas + 'px;width:' + large + 'px';
    /* Scène 4 : la signature, à la place de la scène qui s'estompe */
    sc.innerHTML = svg + '<p class="ph">La magie de Noël passe aussi par un logement impeccable.</p>';
    c.appendChild(sc);
    sc.addEventListener('animationend', function (e) { if (e.target === sc) sc.remove(); });

    /* la poussière de neige du traîneau descend vers la vignette */
    var nb = 0, pous = setInterval(function () {
      if (nb >= 12 || !tr.isConnected) return clearInterval(pous);
      var r = tr.getBoundingClientRect(), v = sc.getBoundingClientRect(); if (r.right < 0) return;
      nb++;
      var x0 = r.left + r.width * 0.1, y0 = r.top + r.height * 0.7, t = 2.5 + R() * 3;
      add('b', 'left:' + x0 + 'px;top:' + y0 + 'px;width:' + t + 'px;height:' + t + 'px;--x:' + Math.round(v.left + R() * v.width - x0) + 'px;--y:' + Math.round(v.top + 10 - y0) +
        'px;--t:' + (2.2 + R() * 0.8).toFixed(2) + 's', false, 'd');
    }, 230);
  }
  window.jg67NoelHistoire = histoire;

  if (!leger && (demo || !deja())) setTimeout(histoire, demo ? 600 : 2600); else prevoir(essai);
})();
