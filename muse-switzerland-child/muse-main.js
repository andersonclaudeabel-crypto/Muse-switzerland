/**
 * MUSE SWITZERLAND — Main JS
 * assets/js/muse-main.js
 */

(function () {
  'use strict';

  /* ============================================================
     CONFIG
  ============================================================ */
  const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" aria-label="Muse Switzerland" role="img">
    <rect x="0.5" y="0.5" width="41" height="41" stroke="#111110" stroke-width="0.75" fill="none"/>
    <text x="11.5" y="24.5" font-family="Cormorant Garamond,Georgia,serif" font-size="17" font-weight="400" fill="#111110">M</text>
    <text x="24" y="29.5" font-family="Cormorant Garamond,Georgia,serif" font-size="12" font-weight="400" fill="#111110">s</text>
  </svg>`;

  const ICONS = {
    search: `<svg viewBox="0 0 24 24" aria-label="Rechercher"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></svg>`,
    account: `<svg viewBox="0 0 24 24" aria-label="Mon compte"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" aria-label="Panier"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  };

  /* ============================================================
     HEADER INJECTION
     Injecte le logo + icônes dans la structure Divi
  ============================================================ */
  function initHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    // --- Logo ---
    injectLogo();

    // --- Icônes droite ---
    injectHeaderIcons();

    // --- Burger mobile ---
    injectBurger();

    // --- Comportement scroll ---
    initScrollHeader();
  }

  function injectLogo() {
    const logoContainer = document.getElementById('logo-container') ||
                          document.querySelector('.et_pb_row.logo-container');

    // Remplacer le logo existant ou créer le wrapper
    const logoLink = logoContainer
      ? logoContainer.querySelector('a')
      : document.createElement('a');

    if (logoContainer) {
      const existingImg = logoContainer.querySelector('img');
      if (!existingImg) {
        // Pas d'image — injecter SVG
        logoLink.innerHTML = LOGO_SVG;
        logoLink.href = '/';
        logoLink.setAttribute('aria-label', 'Muse Switzerland — Accueil');
      }
      // Si image présente : laisser en place, appliquer le style via CSS
    }
  }

  function injectHeaderIcons() {
    // Éviter les doublons
    if (document.querySelector('.muse-header-icons')) return;

    const headerArea = document.querySelector('#main-header-area .container') ||
                       document.querySelector('#main-header-area');
    if (!headerArea) return;

    const cartCount = getCartCount();
    const accountUrl = typeof woocommerce_params !== 'undefined'
      ? woocommerce_params.account_page_url || '/mon-compte/'
      : '/mon-compte/';

    const iconsEl = document.createElement('div');
    iconsEl.className = 'muse-header-icons';
    iconsEl.innerHTML = `
      <a href="/recherche/" class="muse-icon-search" aria-label="Rechercher">
        ${ICONS.search}
      </a>
      <a href="${accountUrl}" class="muse-icon-account" aria-label="Mon compte">
        ${ICONS.account}
      </a>
      <a href="/panier/" class="muse-icon-cart" aria-label="Panier${cartCount > 0 ? ' (' + cartCount + ' article' + (cartCount > 1 ? 's' : '') + ')' : ''}">
        ${ICONS.cart}
        ${cartCount > 0 ? `<span class="muse-cart-count" aria-hidden="true">${cartCount}</span>` : ''}
      </a>
    `;

    headerArea.appendChild(iconsEl);
  }

  function getCartCount() {
    // WooCommerce fragments
    if (typeof wc_cart_fragments_params !== 'undefined') {
      const cartItems = document.querySelector('.cart-contents .count');
      if (cartItems) return parseInt(cartItems.textContent) || 0;
    }
    return 0;
  }

  /* ============================================================
     BURGER MENU MOBILE
  ============================================================ */
  function injectBurger() {
    if (document.querySelector('.muse-burger')) return;

    const headerArea = document.querySelector('#main-header-area .container') ||
                       document.querySelector('#main-header-area');
    if (!headerArea) return;

    // Burger button
    const burger = document.createElement('button');
    burger.className = 'muse-burger';
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'muse-mobile-menu');
    burger.innerHTML = `
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    `;

    // Mobile menu overlay
    const mobileMenu = document.createElement('nav');
    mobileMenu.className = 'muse-mobile-menu';
    mobileMenu.id = 'muse-mobile-menu';
    mobileMenu.setAttribute('aria-label', 'Navigation principale');
    mobileMenu.innerHTML = buildMobileMenuHTML();

    // Insérer
    headerArea.prepend(burger);
    document.body.appendChild(mobileMenu);

    // Events
    burger.addEventListener('click', () => toggleBurger(burger, mobileMenu));

    // Fermer sur ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        toggleBurger(burger, mobileMenu, false);
      }
    });

    // Fermer au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleBurger(burger, mobileMenu, false));
    });
  }

  function toggleBurger(burger, menu, forceState) {
    const isOpen = forceState !== undefined ? forceState : !menu.classList.contains('is-open');

    burger.classList.toggle('is-open', isOpen);
    menu.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function buildMobileMenuHTML() {
    // Reprendre les liens du menu Divi
    const topMenu = document.getElementById('top-menu');
    if (topMenu) {
      const links = topMenu.querySelectorAll('li > a');
      let html = '';
      links.forEach(link => {
        html += `<a href="${link.href}">${link.textContent.trim()}</a>`;
      });
      // Ajouter liens utiles
      html += `<a href="/mon-compte/">Mon compte</a>`;
      html += `<a href="/panier/">Panier</a>`;
      html += `<a href="/vendre/">Vendre mes articles</a>`;
      return html;
    }

    // Fallback
    return `
      <a href="/femme/">Femme</a>
      <a href="/homme/">Homme</a>
      <a href="/recherche/">Rechercher</a>
      <a href="/mon-compte/">Mon compte</a>
      <a href="/panier/">Panier</a>
      <a href="/vendre/">Vendre mes articles</a>
    `;
  }

  /* ============================================================
     COMPORTEMENT SCROLL HEADER
  ============================================================ */
  function initScrollHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          // Ajouter classe scrolled
          header.classList.toggle('muse-scrolled', currentScroll > 20);

          // Masquer header au scroll down (>100px), réafficher au scroll up
          if (currentScroll > 100) {
            header.classList.toggle('muse-hidden', currentScroll > lastScroll + 5);
            if (currentScroll < lastScroll - 5) {
              header.classList.remove('muse-hidden');
            }
          } else {
            header.classList.remove('muse-hidden');
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     MISE À JOUR PANIER (WooCommerce AJAX)
  ============================================================ */
  function initCartUpdate() {
    document.body.addEventListener('wc_fragments_loaded', updateCartBadge);
    document.body.addEventListener('wc_fragments_refreshed', updateCartBadge);
    document.body.addEventListener('added_to_cart', updateCartBadge);
    document.body.addEventListener('removed_from_cart', updateCartBadge);
  }

  function updateCartBadge() {
    const countEl = document.querySelector('.et-cart-info span') ||
                    document.querySelector('.cart-contents .count');

    const badgeEl = document.querySelector('.muse-cart-count');
    const cartIcon = document.querySelector('.muse-icon-cart');

    if (!cartIcon) return;

    const count = countEl ? parseInt(countEl.textContent) || 0 : 0;

    if (count > 0) {
      if (!badgeEl) {
        const badge = document.createElement('span');
        badge.className = 'muse-cart-count';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = count;
        cartIcon.appendChild(badge);
      } else {
        badgeEl.textContent = count;
      }
      cartIcon.setAttribute('aria-label', `Panier (${count} article${count > 1 ? 's' : ''})`);
    } else if (badgeEl) {
      badgeEl.remove();
      cartIcon.setAttribute('aria-label', 'Panier');
    }
  }

  /* ============================================================
     SECTIONS — Appliquer les classes CSS au bon endroit
  ============================================================ */
  function applyDiviSectionClasses() {
    // Identifier sections par contenu textuel et ajouter classes CSS
    document.querySelectorAll('.et_pb_section').forEach(section => {
      const text = section.textContent || '';

      // Section chiffres clés (320, 12K+, CH)
      if (text.includes('320') && text.includes('12K') && text.includes('VENDEURS ACTIFS')) {
        section.classList.add('muse-stats-section');
      }

      // Trust bar (Protection acheteur, Paiement sécurisé...)
      if (text.includes('Protection acheteur') && text.includes('Paiement sécurisé')) {
        section.classList.add('muse-trust-bar');
      }

      // Citation bandeau
      if (text.includes('La mode premium et authentique') && !text.includes('DÉCOUVRIR')) {
        section.classList.add('muse-citation-section');
      }

      // Section catégories
      if (text.includes('FEMME') && text.includes('HOMME') && text.includes('1 840')) {
        section.classList.add('muse-categories-section');
      }

      // CTA vendre (fond noir)
      if (text.includes('Vous avez quelque chose à vendre')) {
        section.classList.add('muse-cta-section');
      }

      // Hero section
      if (text.includes('DÉCOUVRIR LA COLLECTION') && text.includes('VENDRE MES ARTICLES')) {
        section.classList.add('muse-hero-section');
      }
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    initHeader();
    initCartUpdate();
    applyDiviSectionClasses();

    // Ré-appliquer classes après chargement Divi (cas builder)
    if (document.readyState !== 'complete') {
      window.addEventListener('load', applyDiviSectionClasses);
    }
  }

  // Lancement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
