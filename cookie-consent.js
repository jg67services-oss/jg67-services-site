/* JG67 Services — Gestion du consentement cookies (RGPD/CNIL)
   Google Analytics n'est chargé qu'après accord explicite.
   Refus par défaut. Choix persisté. Réouverture via lien footer [data-jg67-consent]. */
(function () {
  "use strict";

  var KEY = "jg67_consent"; /* 'granted' | 'denied' */
  var GA_ID = "G-L3QQGED8VS";

  function getStatus() { try { return window.localStorage.getItem(KEY); } catch (e) { return null; } }
  function setStatus(v) { try { window.localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  /* Consent Mode v2 : tout refusé par défaut, posé avant tout chargement Google */
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  var gaLoaded = false;
  function loadGA() {
    window.jg67ConsentGranted = true;
    if (gaLoaded) return;
    gaLoaded = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  /* ---- Bannière ---- */
  var CSS =
    "#jg67-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;" +
    "max-width:520px;margin:0 auto;background:#0E1E2A;color:#F6F4EF;border:1px solid rgba(183,147,91,.45);" +
    "border-radius:12px;padding:20px 22px;box-shadow:0 12px 40px rgba(10,22,32,.45);" +
    "font-family:'Outfit',system-ui,sans-serif;font-size:.92rem;line-height:1.55}" +
    "#jg67-cookie-banner p{margin:0 0 14px}" +
    "#jg67-cookie-banner a{color:#D8BD8A;text-decoration:underline}" +
    "#jg67-cookie-banner .jg67-cc-btns{display:flex;gap:10px;flex-wrap:wrap}" +
    "#jg67-cookie-banner button{flex:1 1 120px;padding:11px 18px;border-radius:8px;cursor:pointer;" +
    "font-family:inherit;font-size:.92rem;font-weight:500;letter-spacing:.02em;transition:opacity .2s}" +
    "#jg67-cookie-banner button:hover{opacity:.85}" +
    "#jg67-cc-accept{background:#B7935B;border:1px solid #B7935B;color:#0E1E2A}" +
    "#jg67-cc-refuse{background:transparent;border:1px solid rgba(246,244,239,.5);color:#F6F4EF}" +
    "@media(prefers-reduced-motion:no-preference){#jg67-cookie-banner{animation:jg67ccin .35s ease both}" +
    "@keyframes jg67ccin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}}";

  var banner = null;

  function hideBanner() {
    if (banner) { banner.remove(); banner = null; }
  }

  function showBanner() {
    if (banner) return;
    if (!document.getElementById("jg67-cc-style")) {
      var st = document.createElement("style");
      st.id = "jg67-cc-style";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    banner = document.createElement("div");
    banner.id = "jg67-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Gestion des cookies");
    banner.innerHTML =
      "<p><strong>Cookies de mesure d'audience</strong><br>" +
      "Nous utilisons Google Analytics pour comprendre comment le site est utilisé. " +
      "Ces traceurs ne sont déposés qu'avec votre accord. " +
      '<a href="/politique-confidentialite">En savoir plus</a></p>' +
      '<div class="jg67-cc-btns">' +
      '<button type="button" id="jg67-cc-refuse">Refuser</button>' +
      '<button type="button" id="jg67-cc-accept">Accepter</button>' +
      "</div>";
    document.body.appendChild(banner);
    document.getElementById("jg67-cc-accept").addEventListener("click", function () {
      setStatus("granted");
      hideBanner();
      loadGA();
    });
    document.getElementById("jg67-cc-refuse").addEventListener("click", function () {
      setStatus("denied");
      window.jg67ConsentGranted = false;
      hideBanner();
    });
  }

  /* Réouverture du choix (lien footer "Gestion des cookies") */
  window.jg67GestionCookies = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    showBanner();
  };

  function init() {
    var links = document.querySelectorAll("[data-jg67-consent]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", window.jg67GestionCookies);
    }
    var s = getStatus();
    if (s === "granted") { loadGA(); }
    else if (s === "denied") { window.jg67ConsentGranted = false; }
    else { window.jg67ConsentGranted = false; showBanner(); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
