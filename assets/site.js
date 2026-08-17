/* Shared behaviour for every page of The Wasatch Yard. */
(function () {
  'use strict';

  var RACE_START_UTC = Date.parse('2026-10-24T00:00:00Z'); // 6:00 PM MDT, Fri Oct 23 2026

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ---- Mobile navigation ------------------------------------------------ */

  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a destination, on Escape, or on an outside click.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
  }

  /* ---- Scroll reveal ---------------------------------------------------- */

  function initReveal() {
    var sections = document.querySelectorAll('.fade-section');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    // Trigger on any intersection rather than a visible-area ratio: a section
    // taller than the viewport can never reach a fractional threshold, which
    // would leave it stuck at opacity 0 forever (the photo wall does this).
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    // Anything already on screen is marked shown before the hiding styles are
    // enabled, so enabling them cannot flash content out and back in.
    sections.forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        el.classList.add('show');
      } else {
        observer.observe(el);
      }
    });

    document.documentElement.classList.add('reveal-ready');
  }

  /* ---- Countdown -------------------------------------------------------- */

  function initCountdown() {
    var root = document.getElementById('countdown');
    if (!root) return;

    var fields = ['days', 'hours', 'minutes', 'seconds'].map(function (id) {
      return document.getElementById(id);
    });
    if (fields.some(function (el) { return !el; })) return;

    var note = document.getElementById('countdown-note');

    function pad(value) {
      return String(value).padStart(2, '0');
    }

    function tick() {
      var remaining = RACE_START_UTC - Date.now();

      if (remaining <= 0) {
        fields.forEach(function (el) { el.textContent = '00'; });
        root.setAttribute('data-state', 'started');
        if (note) note.textContent = 'The race is under way. Follow along on UltraSignup.';
        return true;
      }

      var days = Math.floor(remaining / 86400000);
      remaining -= days * 86400000;
      var hours = Math.floor(remaining / 3600000);
      remaining -= hours * 3600000;
      var minutes = Math.floor(remaining / 60000);
      remaining -= minutes * 60000;

      fields[0].textContent = pad(days);
      fields[1].textContent = pad(hours);
      fields[2].textContent = pad(minutes);
      fields[3].textContent = pad(Math.floor(remaining / 1000));
      return false;
    }

    if (tick()) return;
    var timer = setInterval(function () {
      if (tick()) clearInterval(timer);
    }, 1000);
  }

  /* ---- Photo gallery ---------------------------------------------------- */

  // [file name, thumbnail width, thumbnail height] in display order.
  var PHOTOS = [
    ["EditedBackyard.jpg",640,960],
    ["EditedBackyard-4.jpg",640,960],
    ["EditedBackyard-7.jpg",640,960],
    ["EditedBackyard-9.jpg",640,960],
    ["EditedBackyard-11.jpg",640,960],
    ["EditedBackyard-12.jpg",640,960],
    ["EditedBackyard-14.jpg",640,960],
    ["EditedBackyard-16.jpg",640,960],
    ["EditedBackyard-18.jpg",640,960],
    ["EditedBackyard-19.jpg",640,960],
    ["EditedBackyard-20.jpg",640,960],
    ["EditedBackyard-21.jpg",640,427],
    ["EditedBackyard-23.jpg",640,960],
    ["EditedBackyard-24.jpg",640,960],
    ["EditedBackyard-26.jpg",640,960],
    ["EditedBackyard-28.jpg",640,960],
    ["EditedBackyard-30.jpg",640,960],
    ["EditedBackyard-33.jpg",640,960],
    ["EditedBackyard-37.jpg",640,960],
    ["EditedBackyard-38.jpg",640,960],
    ["EditedBackyard-42.jpg",640,960],
    ["EditedBackyard-44.jpg",640,960],
    ["EditedBackyard-46.jpg",640,960],
    ["EditedBackyard-48.jpg",640,960],
    ["EditedBackyard-49.jpg",640,960],
    ["EditedBackyard-51.jpg",640,960],
    ["EditedBackyard-52.jpg",640,960],
    ["EditedBackyard-54.jpg",640,960],
    ["EditedBackyard-55.jpg",640,960],
    ["EditedBackyard-56.jpg",640,960],
    ["EditedBackyard-57.jpg",640,960],
    ["EditedBackyard-59.jpg",640,960],
    ["EditedBackyard-60.jpg",640,960],
    ["EditedBackyard-61.jpg",640,960],
    ["EditedBackyard-62.jpg",640,960],
    ["EditedBackyard-63.jpg",640,960],
    ["EditedBackyard-64.jpg",640,960],
    ["EditedBackyard-66.jpg",640,960],
    ["EditedBackyard-68.jpg",640,960],
    ["EditedBackyard-69.jpg",640,960],
    ["EditedBackyard-71.jpg",640,427],
    ["EditedBackyard-73.jpg",640,427],
    ["EditedBackyard-75.jpg",640,960],
    ["EditedBackyard-76.jpg",640,960],
    ["EditedBackyard-79.jpg",640,960],
    ["EditedBackyard-81.jpg",640,960],
    ["EditedBackyard-82.jpg",640,960],
    ["EditedBackyard-83.jpg",640,960],
    ["EditedBackyard-84.jpg",640,427],
    ["EditedBackyard-85.jpg",640,960],
    ["EditedBackyard-86.jpg",640,427],
    ["EditedBackyard-88.jpg",640,427],
    ["EditedBackyard-89.jpg",640,960],
    ["EditedBackyard-90.jpg",640,960],
    ["EditedBackyard-91.jpg",640,960],
    ["EditedBackyard-92.jpg",640,960],
    ["EditedBackyard-93.jpg",640,960],
    ["EditedBackyard-95.jpg",640,960],
    ["EditedBackyard-97.jpg",640,960],
    ["EditedBackyard-98.jpg",640,427],
    ["EditedBackyard-100.jpg",640,427],
    ["EditedBackyard-102.jpg",640,960],
    ["EditedBackyard-103.jpg",640,960],
    ["EditedBackyard-105.jpg",640,960],
    ["EditedBackyard-106.jpg",640,960],
    ["EditedBackyard-109.jpg",640,960],
    ["EditedBackyard-110.jpg",640,960],
    ["TO106589.jpg",640,427],
    ["TO106596.jpg",640,960],
    ["TO106601.jpg",640,960],
    ["TO106609.jpg",640,960],
    ["TO106632.jpg",640,960],
    ["TO106648.jpg",640,800],
    ["TO106656.jpg",640,427]
  ];

  function photoAlt(index) {
    return 'Runners at The Wasatch Yard backyard ultra in Round Valley, Park City, Utah - photo ' +
      (index + 1) + ' of ' + PHOTOS.length;
  }

  function initGallery() {
    var wall = document.getElementById('photo-wall');
    var lightbox = document.getElementById('lightbox');
    if (!wall || !lightbox) return;

    var image = document.getElementById('lightbox-image');
    var counter = document.getElementById('lightbox-count');
    var closeButton = document.getElementById('lightbox-close');
    var previousButton = document.getElementById('lightbox-prev');
    var nextButton = document.getElementById('lightbox-next');
    var fullSizeLink = document.getElementById('lightbox-full');
    var countLabel = document.getElementById('photo-count');
    var activeIndex = 0;
    var lastFocused = null;

    PHOTOS.forEach(function (photo, index) {
      var name = photo[0];
      var link = document.createElement('a');
      link.className = 'photo-tile';
      link.href = 'assets/gallery/' + name;
      link.setAttribute('aria-label', 'Open race photo ' + (index + 1) + ' in the photo viewer');

      var img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = photo[1];
      img.height = photo[2];
      img.src = 'assets/gallery/thumbs/' + name;
      img.alt = photoAlt(index);
      img.addEventListener('error', function () {
        link.classList.add('photo-tile-missing');
        img.src = 'assets/sponsor-placeholder.png';
        img.alt = 'This race photo could not be loaded';
      });

      link.appendChild(img);
      link.addEventListener('click', function (event) {
        event.preventDefault();
        open(index);
      });
      wall.appendChild(link);
    });

    if (countLabel) countLabel.textContent = String(PHOTOS.length);

    function show(index) {
      activeIndex = (index + PHOTOS.length) % PHOTOS.length;
      var name = PHOTOS[activeIndex][0];
      var path = 'assets/gallery/' + name;
      lightbox.classList.add('is-loading');
      image.src = path;
      image.alt = photoAlt(activeIndex);
      counter.textContent = 'Photo ' + (activeIndex + 1) + ' of ' + PHOTOS.length;
      if (fullSizeLink) fullSizeLink.href = path;
    }

    image.addEventListener('load', function () {
      lightbox.classList.remove('is-loading');
    });

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    }

    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      image.src = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    closeButton.addEventListener('click', close);
    previousButton.addEventListener('click', function () { show(activeIndex - 1); });
    nextButton.addEventListener('click', function () { show(activeIndex + 1); });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('open')) return;

      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowLeft') {
        show(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        show(activeIndex + 1);
      } else if (event.key === 'Tab') {
        // Keep keyboard focus inside the viewer while it is open.
        var stops = [closeButton, previousButton, nextButton];
        if (fullSizeLink) stops.push(fullSizeLink);
        var current = stops.indexOf(document.activeElement);
        var next = (current + (event.shiftKey ? -1 : 1) + stops.length) % stops.length;
        event.preventDefault();
        stops[next].focus();
      }
    });
  }

  /* ---- FAQ disclosure --------------------------------------------------- */

  function initFaq() {
    // <details> handles this natively; this only keeps one answer open at a time.
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  ready(function () {
    initNav();
    initReveal();
    initCountdown();
    initGallery();
    initFaq();
  });
})();
