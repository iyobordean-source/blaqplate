/* =========================================================
   BLAQPLATE — site interactions
   ========================================================= */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2348064083513";
  var OPEN_DATE = new Date("2026-08-30T09:00:00+01:00").getTime();

  /* ---------- Loader ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (loader) {
      setTimeout(function () { loader.classList.add("is-hidden"); }, 350);
    }
  });

  /* ---------- Nav scroll state + mobile toggle ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 40) { nav.classList.add("is-scrolled"); }
    else { nav.classList.remove("is-scrolled"); }
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Countdown (hero, subtle) ---------- */
  function pad(n) { return String(n).padStart(2, "0"); }

  function updateCountdown() {
    var now = Date.now();
    var diff = OPEN_DATE - now;
    var heroCountdown = document.getElementById("heroCountdown");
    if (!heroCountdown) return;

    if (diff <= 0) {
      var target = heroCountdown.querySelector(".hc-target");
      if (target) target.textContent = "Blaqplate is OPEN 🎉";
      heroCountdown.querySelectorAll('[data-unit]').forEach(function (el) { el.textContent = "00"; });
      return;
    }

    var seconds = Math.floor(diff / 1000);
    var days = Math.floor(seconds / 86400); seconds -= days * 86400;
    var hours = Math.floor(seconds / 3600); seconds -= hours * 3600;
    var minutes = Math.floor(seconds / 60); seconds -= minutes * 60;

    var values = { days: days, hours: hours, minutes: minutes, seconds: seconds };
    Object.keys(values).forEach(function (unit) {
      var el = heroCountdown.querySelector('[data-unit="' + unit + '"]');
      if (el) el.textContent = pad(values[unit]);
    });
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Featured food gallery ---------- */
  var GALLERY = [
    { tone: "red", icon: "🍚", name: "Rice & Meals", desc: "Jollof, fried rice and local rice specials.", cat: "Rice & Meals" },
    { tone: "gold", icon: "🍗", name: "Chicken", desc: "Grilled, peppered and fried chicken plates.", cat: "Chicken" },
    { tone: "black", icon: "🍔", name: "Burgers", desc: "Stacked beef and chicken burgers, fries on the side.", cat: "Burgers" },
    { tone: "red2", icon: "🍕", name: "Pizza", desc: "Wood-style pizzas, classic and loaded toppings.", cat: "Pizza" },
    { tone: "gold", icon: "🌯", name: "Shawarma", desc: "Grilled chicken or beef shawarma, house sauce.", cat: "Shawarma" },
    { tone: "black", icon: "🥪", name: "Sandwiches", desc: "Toasted sandwiches, fresh fillings, quick bites.", cat: "Sandwiches" },
    { tone: "red", icon: "🍜", name: "Noodles & Pasta", desc: "Stir-fried noodles and pasta, house sauces.", cat: "Noodles & Pasta" },
    { tone: "gold", icon: "🥤", name: "Drinks", desc: "Chilled soft drinks, juices and house blends.", cat: "Drinks" }
  ];

  var galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    galleryGrid.innerHTML = GALLERY.map(function (item) {
      var waMsg = encodeURIComponent("Hi Blaqplate, I'd like to order from your " + item.cat + " menu");
      return (
        '<article class="gallery-card" data-tone="' + item.tone + '">' +
          '<div class="ph-image"><span class="ph-icon">' + item.icon + '</span></div>' +
          '<div class="gallery-body">' +
            '<h3>' + item.name + '</h3>' +
            '<p>' + item.desc + '</p>' +
            '<a class="gallery-cta" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + waMsg + '" target="_blank" rel="noopener">Order Now <span>&rarr;</span></a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".way-card, .gallery-card, .plan-media, .plan-copy, .why-card, .location-copy, .location-map, .review-card, .zone-card, .ph-celeb, .social-grid > div, .how-step"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();