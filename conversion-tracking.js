(function () {
  "use strict";

  var VALUE_BY_EVENT = {
    generate_lead: 120,
    whatsapp_click: 35,
    phone_click: 35,
    email_click: 20,
    lead_cta_click: 10,
    lead_form_submit_attempt: 5,
    google_reviews_click: 3
  };

  function pageType() {
    var path = window.location.pathname;
    if (path === "/" || path === "/index.html") return "home";
    if (path.indexOf("contact") !== -1) return "contact";
    if (path.indexOf("conciergerie") !== -1) return "b2b";
    if (path.indexOf("prix") !== -1) return "pricing";
    if (path.indexOf("menage-airbnb") !== -1) return "seo_local";
    if (path.indexOf("nettoyage-location") !== -1) return "seo_service";
    return "content";
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 140);
  }

  function sendEvent(name, params) {
    var payload = Object.assign({
      event_category: "conversion",
      page_type: pageType(),
      page_path: window.location.pathname,
      page_title: document.title,
      value: VALUE_BY_EVENT[name] || 0,
      currency: "EUR"
    }, params || {});

    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, payload));
    }
  }

  window.jg67TrackConversion = sendEvent;
  document.documentElement.setAttribute("data-jg67-tracking", "ready");

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");
    if (!link) return;

    var href = link.getAttribute("href") || "";
    var text = cleanText(link.textContent || link.getAttribute("aria-label"));
    var params = {
      link_url: href,
      link_text: text,
      link_location: link.closest("header") ? "header" : link.closest("footer") ? "footer" : link.classList.contains("wa") ? "floating_whatsapp" : "body"
    };

    if (/wa\.me|api\.whatsapp\.com/i.test(href)) {
      sendEvent("whatsapp_click", params);
      return;
    }

    if (href.indexOf("tel:") === 0) {
      sendEvent("phone_click", params);
      return;
    }

    if (href.indexOf("mailto:") === 0) {
      sendEvent("email_click", params);
      return;
    }

    if (/google\.com\/maps|google\.com\/search/i.test(href)) {
      sendEvent("google_reviews_click", params);
      return;
    }

    if (/devis|contact|whatsapp/i.test(href + " " + text)) {
      sendEvent("lead_cta_click", params);
    }
  }, { passive: true });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.matches || !form.matches("form")) return;
    sendEvent("lead_form_submit_attempt", {
      form_name: form.getAttribute("name") || form.id || "unknown",
      form_action: form.getAttribute("action") || window.location.pathname
    });
  }, true);
})();
