/* L&R Abogados y Asociados — interacciones de la landing
   Fiel al prototipo del handoff (design_src/design_handoff_lr_landing). */
(function () {
  'use strict';

  var WA_BASE = 'https://wa.me/56945995534';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var docEl = document.documentElement;

  /* ── Campaña dinámica (?area=…) ─────────────────────────────── */
  var CAMPAIGNS = {
    'despido':          { badge: 'DESPIDOS Y DERECHOS LABORALES · REVISA TU CASO', select: 'Laboral', wa: 'despido y derechos laborales' },
    'laboral':          { badge: 'DESPIDOS Y DERECHOS LABORALES · REVISA TU CASO', select: 'Laboral', wa: 'un tema laboral' },
    'alimentos':        { badge: 'PENSIÓN DE ALIMENTOS · SOLICITUD, COBRO Y MODIFICACIÓN', select: 'Familia', wa: 'pensión de alimentos' },
    'divorcio':         { badge: 'DIVORCIO Y FAMILIA · TE ACOMPAÑAMOS CON DISCRECIÓN', select: 'Familia', wa: 'divorcio' },
    'arriendos':        { badge: 'ARRENDATARIOS MOROSOS · RECUPERA TU PROPIEDAD', select: 'Civil', wa: 'un problema de arriendo' },
    'penal':            { badge: 'DEFENSA PENAL · ACTUAR A TIEMPO MARCA LA DIFERENCIA', select: 'Penal', wa: 'defensa penal' },
    'visitas':          { badge: 'RELACIÓN DIRECTA Y REGULAR · EL VÍNCULO CON TUS HIJOS', select: 'Familia', wa: 'régimen de visitas (relación directa y regular)' },
    'cuidado-personal': { badge: 'CUIDADO PERSONAL · DECISIONES QUE PROTEGEN A TUS HIJOS', select: 'Familia', wa: 'cuidado personal de mis hijos' },
    'herencias':        { badge: 'HERENCIAS Y POSESIÓN EFECTIVA · ORDENA EL PATRIMONIO', select: 'Civil', wa: 'una herencia' },
    'marcas':           { badge: 'REGISTRO DE MARCAS · PROTEGE TU NOMBRE COMERCIAL', select: 'Marcas', wa: 'registro de marca' }
  };

  var params = new URLSearchParams(window.location.search);
  var areaParam = (params.get('area') || '').toLowerCase();
  var camp = CAMPAIGNS[areaParam] || null;
  var waText = 'Hola L&R Abogados, necesito orientación sobre mi caso.';
  if (camp) waText = 'Hola L&R Abogados, quisiera orientación sobre ' + camp.wa + '.';
  var waHref = WA_BASE + '?text=' + encodeURIComponent(waText);

  document.querySelectorAll('.wa-link').forEach(function (a) {
    a.setAttribute('href', waHref);
  });

  if (camp) {
    var badge = document.getElementById('camp-badge');
    var badgeTxt = document.getElementById('camp-txt');
    if (badge && badgeTxt) { badgeTxt.textContent = camp.badge; badge.hidden = false; }
    var sel = document.getElementById('lr-f-area');
    if (sel) sel.value = camp.select;
  }

  /* ── Navbar solidify ────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Menú móvil ─────────────────────────────────────────────── */
  var burger = document.getElementById('nav-burger');
  var menu = document.getElementById('mobile-menu');
  function closeMenu() {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.hidden;
      menu.hidden = !open;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      } else {
        burger.focus();
      }
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { closeMenu(); burger.focus(); return; }
      if (e.key === 'Tab') {
        // Mantener el foco dentro del overlay
        var focusables = menu.querySelectorAll('a');
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var mqMenu = window.matchMedia('(min-width: 768px)');
    var onMqMenu = function () { if (mqMenu.matches && !menu.hidden) closeMenu(); };
    if (mqMenu.addEventListener) mqMenu.addEventListener('change', onMqMenu);
    else if (mqMenu.addListener) mqMenu.addListener(onMqMenu);
  }

  /* ── Scroll reveals + líneas ────────────────────────────────── */
  if (!reduced && 'IntersectionObserver' in window) {
    docEl.classList.add('js-anim');
    var ioFired = false;
    var io = new IntersectionObserver(function (entries) {
      ioFired = true;
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.style.transitionDelay = (el.getAttribute('data-reveal-delay') || 0) + 'ms';
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

    var io2 = new IntersectionObserver(function (entries) {
      ioFired = true;
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io2.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-line]').forEach(function (el) { io2.observe(el); });

    /* Pausar loops continuos fuera de viewport */
    var ioPause = new IntersectionObserver(function (entries) {
      ioFired = true;
      entries.forEach(function (e) {
        e.target.classList.toggle('anim-paused', !e.isIntersecting);
      });
    }, { threshold: 0 });
    document.querySelectorAll('.hero, .marquee, .cta-banner, .areas').forEach(function (el) { ioPause.observe(el); });

    /* Resiliencia: si el observer no reporta nada (entornos degradados),
       mostrar todo el contenido y cargar imágenes de inmediato. */
    setTimeout(function () {
      if (ioFired) return;
      io.disconnect(); io2.disconnect(); ioPause.disconnect();
      document.querySelectorAll('[data-reveal], [data-line]').forEach(function (el) { el.classList.add('is-in'); });
      document.querySelectorAll('img[loading="lazy"]').forEach(function (i) { i.loading = 'eager'; });
    }, 2000);
  } else {
    /* Sin animaciones: garantizar carga de imágenes al hacer scroll nativo */
    document.querySelectorAll('img[loading="lazy"]').forEach(function (i) {
      if (!('IntersectionObserver' in window)) i.loading = 'eager';
    });
  }

  /* ── Luz de cursor (solo desktop, sin reduced motion) ───────── */
  if (!reduced && finePointer && window.innerWidth >= 1024) {
    docEl.classList.add('js-glow');
    var glow = document.getElementById('lr-glow');
    var mx = 0, my = 0, raf = 0;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        glow.style.transform = 'translate(' + (mx - 320) + 'px,' + (my - 320) + 'px)';
      });
    }, { passive: true });
  }

  /* ── Áreas: panel desktop + acordeón mobile ─────────────────── */
  var rows = Array.prototype.slice.call(document.querySelectorAll('.area-row'));
  var details = Array.prototype.slice.call(document.querySelectorAll('.areas-panel .area-detail'));
  var mqDesktop = window.matchMedia('(min-width: 1200px)');

  // Clonar contenido del panel dentro de cada acordeón (una sola fuente de verdad en el HTML)
  document.querySelectorAll('.area-acc').forEach(function (acc) {
    var idx = acc.getAttribute('data-acc');
    var src = document.querySelector('.areas-panel .area-detail[data-detail="' + idx + '"]');
    if (src) {
      var clone = src.cloneNode(true);
      clone.hidden = false;
      clone.classList.remove('anim-in');
      acc.appendChild(clone);
    }
  });

  var activeArea = 0;
  function showPanel(idx) {
    if (idx === activeArea && details[idx] && !details[idx].hidden) return;
    activeArea = idx;
    details.forEach(function (d, i) {
      d.hidden = i !== idx;
      d.classList.toggle('anim-in', i === idx);
    });
    rows.forEach(function (r, i) {
      r.classList.toggle('is-active', i === idx);
      r.setAttribute('aria-expanded', String(i === idx));
    });
  }

  rows.forEach(function (row, i) {
    row.addEventListener('mouseenter', function () {
      if (mqDesktop.matches) showPanel(i);
    });
    row.addEventListener('click', function () {
      if (mqDesktop.matches) { showPanel(i); return; }
      // Acordeón mobile: un ítem abierto a la vez
      var item = row.closest('.area-item');
      var wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.area-item.is-open').forEach(function (it) {
        it.classList.remove('is-open');
        it.querySelector('.area-row').setAttribute('aria-expanded', 'false');
        it.querySelector('.area-row').classList.remove('is-active');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        row.setAttribute('aria-expanded', 'true');
        row.classList.add('is-active');
      }
    });
  });
  if (rows[0] && mqDesktop.matches) {
    rows[0].classList.add('is-active');
    rows[0].setAttribute('aria-expanded', 'true');
  }

  // Al cruzar el breakpoint, limpiar el estado del modo anterior
  function onAreaModeChange() {
    document.querySelectorAll('.area-item.is-open').forEach(function (it) { it.classList.remove('is-open'); });
    rows.forEach(function (r, i) {
      var active = mqDesktop.matches && i === activeArea;
      r.classList.toggle('is-active', active);
      r.setAttribute('aria-expanded', String(active));
    });
  }
  if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', onAreaModeChange);
  else if (mqDesktop.addListener) mqDesktop.addListener(onAreaModeChange);

  /* ── FAQ (un ítem a la vez) ─────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(function (it) {
        it.classList.remove('is-open');
        it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Tarjetas de problemas → preseleccionar área ────────────── */
  document.querySelectorAll('.p-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var area = card.getAttribute('data-area');
      var sel = document.getElementById('lr-f-area');
      if (area && sel) sel.value = area;
    });
  });

  /* ── Formulario: WhatsApp + registro real por email ─────────── */
  var form = document.getElementById('lr-form');
  var submitBtn = document.getElementById('form-submit');
  var errBox = document.getElementById('form-error');
  var noteBox = document.getElementById('form-note');

  function fieldVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  if (form) {
    // Con JS activo tomamos el control de la validación; sin JS rige la nativa del navegador
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      errBox.hidden = true;
      ['lr-f-nombre', 'lr-f-fono', 'lr-f-mail'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) { el.classList.remove('f-invalid'); el.removeAttribute('aria-invalid'); }
      });

      var honey = form.querySelector('.hp-field');
      if (honey && honey.value) return; // bot

      var nombre = fieldVal('lr-f-nombre');
      var fono = fieldVal('lr-f-fono');
      var mail = fieldVal('lr-f-mail');
      var area = fieldVal('lr-f-area');
      var msg = fieldVal('lr-f-msg');

      function markInvalid(id) {
        var el = document.getElementById(id);
        el.classList.add('f-invalid');
        el.setAttribute('aria-invalid', 'true');
        el.setAttribute('aria-describedby', 'form-error');
      }
      var errors = [];
      if (!nombre) { errors.push('tu nombre'); markInvalid('lr-f-nombre'); }
      var digits = fono.replace(/\D/g, '');
      if (!fono || digits.length < 8) { errors.push('un número de WhatsApp válido'); markInvalid('lr-f-fono'); }
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { errors.push('un email válido (o déjalo vacío)'); markInvalid('lr-f-mail'); }

      if (errors.length) {
        errBox.textContent = 'Para poder ayudarte necesitamos ' + errors.join(' y ') + '.';
        errBox.hidden = false;
        return;
      }

      // 1) Abrir WhatsApp con el mensaje listo (conversión primaria, dentro del gesto del usuario)
      var texto = 'Hola L&R Abogados, soy ' + nombre + '. Área: ' + area + '.' +
        (msg ? ' ' + msg : '') +
        ' | WhatsApp: ' + fono +
        (mail ? ' | Email: ' + mail : '');
      window.open(WA_BASE + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');

      // 2) Registrar la consulta por email (FormSubmit AJAX) — envío real
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVIANDO…';

      fetch('https://formsubmit.co/ajax/ray.esteban93@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Nueva consulta — Landing L&R Abogados',
          _template: 'table',
          _cc: 'marceloavila@gmail.com',
          nombre: nombre,
          whatsapp: fono,
          email: mail || '(no indicado)',
          area: area,
          mensaje: msg || '(sin mensaje)',
          origen: window.location.href
        })
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function () {
        submitBtn.textContent = 'CONSULTA ENVIADA ✓';
        submitBtn.classList.add('is-success');
        noteBox.textContent = 'Recibimos tu consulta y abrimos WhatsApp con tu mensaje listo. Te responderemos a la brevedad.';
        form.querySelectorAll('input:not([type=hidden]):not(.hp-field), textarea').forEach(function (el) { el.value = ''; });
        var areaSel = document.getElementById('lr-f-area');
        if (areaSel) areaSel.selectedIndex = 0;
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-success');
          submitBtn.textContent = 'ENVIAR CONSULTA →';
        }, 6000);
      }).catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'ENVIAR CONSULTA →';
        noteBox.textContent = 'Abrimos WhatsApp con tu mensaje listo — envíalo por ahí y te responderemos a la brevedad.';
      });
    });
  }

  /* ── Año dinámico ───────────────────────────────────────────── */
  var y = document.getElementById('lr-year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
