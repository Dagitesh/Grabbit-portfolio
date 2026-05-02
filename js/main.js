(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header shadow */
  var header = document.querySelector(".site-header");
  if (header && !header.classList.contains("site-header--minimal")) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile nav */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav && header) {
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          header.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Business form: loading state (submits to FormSubmit) */
  var form = document.getElementById("business-form");
  var submitBtn = document.getElementById("submit-btn");
  if (form && submitBtn) {
    form.addEventListener("submit", function () {
      submitBtn.disabled = true;
      var text = submitBtn.querySelector(".btn-text");
      var loading = submitBtn.querySelector(".btn-loading");
      if (text) text.hidden = true;
      if (loading) loading.hidden = false;
    });
  }

  /* Optional: set absolute thank-you URL for FormSubmit when hosted */
  var nextInput = document.querySelector('input[name="_next"]');
  if (nextInput && window.location.protocol !== "file:") {
    try {
      var u = new URL("thank-you.html", window.location.href);
      nextInput.value = u.href;
    } catch (e) {
      /* keep relative */
    }
  }
})();
