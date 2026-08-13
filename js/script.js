/* =========================================================
   BLAQPLATE — site interactions
   ========================================================= */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2349155501988";
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

  /* ---------- Countdown (hero + dedicated section) ---------- */
  function pad(n) { return String(n).padStart(2, "0"); }

  function updateCountdown() {
    var now = Date.now();
    var diff = OPEN_DATE - now;

    var groups = [document.getElementById("heroCountdown"), document.getElementById("countdownBig")];

    if (diff <= 0) {
      var headline = document.getElementById("countdownHeadline");
      var section = document.getElementById("countdown");
      if (headline && headline.textContent !== "Blaqplate is OPEN 🎉") {
        headline.textContent = "Blaqplate is OPEN 🎉";
        section.classList.add("countdown-open");
        document.getElementById("countdownBig").style.display = "none";
      }
      var heroNums = document.querySelectorAll('[data-unit]');
      heroNums.forEach(function (el) { el.textContent = "00"; });
      return;
    }

    var seconds = Math.floor(diff / 1000);
    var days = Math.floor(seconds / 86400); seconds -= days * 86400;
    var hours = Math.floor(seconds / 3600); seconds -= hours * 3600;
    var minutes = Math.floor(seconds / 60); seconds -= minutes * 60;

    var values = { days: days, hours: hours, minutes: minutes, seconds: seconds };

    groups.forEach(function (group) {
      if (!group) return;
      Object.keys(values).forEach(function (unit) {
        var el = group.querySelector('[data-unit="' + unit + '"]');
        if (el) el.textContent = pad(values[unit]);
      });
    });
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Menu data ---------- */
  var MENU = [
    { cat: "rice", name: "Blaqplate Jollof", desc: "Smoked party-style jollof, deep tomato base.", price: "₦4,500", icon: "🍚" },
    { cat: "rice", name: "Ofada Special", desc: "Local ofada rice, ayamase sauce, assorted meat.", price: "₦5,800", icon: "🍲" },
    { cat: "rice", name: "Fried Rice", desc: "Garden vegetables, liver, prawn cracker.", price: "₦4,200", icon: "🍛" },
    { cat: "chicken", name: "Suya-Glazed Chicken", desc: "Char-grilled, yaji spice crust.", price: "₦5,200", icon: "🍗" },
    { cat: "chicken", name: "Peppered Chicken", desc: "Deep-fried chicken tossed in pepper sauce.", price: "₦4,800", icon: "🌶️" },
    { cat: "chicken", name: "Chicken Shawarma Wrap", desc: "Grilled chicken, house sauce, toasted wrap.", price: "₦3,500", icon: "🌯" },
    { cat: "local", name: "Asun Sharing Plate", desc: "Spicy grilled goat meat, bell peppers.", price: "₦6,000", icon: "🥘" },
    { cat: "local", name: "Pepper Soup", desc: "Goat meat, aromatic spice broth.", price: "₦4,000", icon: "🍜" },
    { cat: "local", name: "Pounded Yam & Egusi", desc: "Smooth pounded yam, rich egusi soup.", price: "₦5,500", icon: "🍠" },
    { cat: "sides", name: "Fried Plantain", desc: "Sweet, golden, lightly caramelised.", price: "₦1,500", icon: "🍌" },
    { cat: "sides", name: "Coleslaw", desc: "Crisp house-made slaw.", price: "₦1,200", icon: "🥗" },
    { cat: "sides", name: "Moi Moi", desc: "Steamed bean pudding, boiled egg.", price: "₦1,800", icon: "🍮" },
    { cat: "drinks", name: "Chapman", desc: "House-blend, citrus, grenadine.", price: "₦2,500", icon: "🍹" },
    { cat: "drinks", name: "Zobo", desc: "Chilled hibiscus, ginger, pineapple.", price: "₦1,800", icon: "🧃" },
    { cat: "drinks", name: "Soft Drink", desc: "Chilled bottle, assorted flavours.", price: "₦900", icon: "🥤" },
    { cat: "specials", name: "Blaqplate Grill Combo", desc: "Suya chicken, jollof, plantain, drink.", price: "₦8,500", icon: "🍽️" },
    { cat: "specials", name: "Sharing Platter For Two", desc: "Asun, jollof, chicken, sides, plantain.", price: "₦12,000", icon: "🥩" },
  ];

  var menuGrid = document.getElementById("menuGrid");
  if (menuGrid) {
    var toneCycle = ["red", "gold", "black", "red2"];
    menuGrid.innerHTML = MENU.map(function (item, i) {
      var waMsg = encodeURIComponent("Hi Blaqplate, I'd like to order the " + item.name);
      return (
        '<div class="menu-item" data-cat="' + item.cat + '">' +
          '<div class="ph-image" data-tone="' + toneCycle[i % 4] + '"><span class="ph-icon">' + item.icon + '</span></div>' +
          '<div class="mi-body">' +
            '<div class="mi-top"><h4>' + item.name + '</h4><span class="mi-price">' + item.price + '</span></div>' +
            '<p>' + item.desc + '</p>' +
          '</div>' +
          '<a class="mi-add" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + waMsg + '" target="_blank" rel="noopener" aria-label="Order ' + item.name + ' on WhatsApp">+</a>' +
        '</div>'
      );
    }).join("");
  }

  var filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      var cat = btn.getAttribute("data-cat");
      document.querySelectorAll(".menu-item").forEach(function (item) {
        var match = cat === "all" || item.getAttribute("data-cat") === cat;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".about-media, .about-copy, .dish-card, .why-card, .menu-item, .location-copy, .location-map, .social-grid > div"
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
