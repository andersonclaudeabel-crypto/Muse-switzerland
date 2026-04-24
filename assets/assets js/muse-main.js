/**
 * MUSE SWITZERLAND — Main JS v1.0
 * À placer dans: assets/js/muse-main.js
 */
(function () {
  'use strict';

  // --- Sidebar Menu ---
  const burgerBtn = document.querySelector('.muse-burger');
  const sidebar   = document.getElementById('muse-sidebar');
  const overlay   = document.getElementById('muse-overlay');
  if (burgerBtn && sidebar) {
    burgerBtn.addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('open'); });
    overlay.addEventListener('click',  () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); });
  }

  // --- Language Dropdown ---
  const langBtn      = document.querySelector('.muse-lang-btn');
  const langDropdown = document.getElementById('muse-lang-dropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => { e.stopPropagation(); langDropdown.classList.toggle('open'); });
    document.querySelectorAll('.muse-lang-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        langBtn.innerHTML = opt.dataset.flag + ' ' + opt.dataset.code;
        document.querySelectorAll('.muse-lang-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        langDropdown.classList.remove('open');
      });
    });
  }

  // --- Account Dropdown ---
  const accountBtn      = document.querySelector('.muse-account-btn');
  const accountDropdown = document.getElementById('muse-account-dropdown');
  if (accountBtn && accountDropdown) {
    accountBtn.addEventListener('click', (e) => { e.stopPropagation(); accountDropdown.classList.toggle('open'); });
  }

  // --- Fermer dropdowns au clic extérieur ---
  document.addEventListener('click', () => {
    document.querySelectorAll('.muse-dropdown').forEach(d => d.classList.remove('open'));
  });

  // --- Sélecteur de taille ---
  document.querySelectorAll('.muse-size-btn').forEach((btn) => {
    if (!btn.classList.contains('unavail')) {
      btn.addEventListener('click', () => {
        btn.closest('.muse-sizes').querySelectorAll('.muse-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    }
  });

  // --- Accordion ---
  document.querySelectorAll('.muse-acc-header').forEach((header) => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('svg');
      body.classList.toggle('open');
      if (icon) icon.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
    });
  });

  // --- Bundle "Fréquemment achetés ensemble" ---
  const bundlePrices = { 0: 189, 1: 95, 2: 120 };
  document.querySelectorAll('.muse-bundle-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      const img   = item.querySelector('.muse-bundle-img');
      const check = item.querySelector('.muse-bundle-check');
      const isSelected = img.classList.contains('selected');
      img.classList.toggle('selected', !isSelected);
      if (check) check.style.display = isSelected ? 'none' : 'flex';
      let total = 0;
      document.querySelectorAll('.muse-bundle-item').forEach((it, j) => {
        if (it.querySelector('.muse-bundle-img.selected')) total += (bundlePrices[j] || 0);
      });
      const el = document.getElementById('muse-bundle-total');
      if (el) el.textContent = 'CHF ' + total + '.–';
    });
  });

  // --- Checkout: livraison ---
  document.querySelectorAll('.muse-delivery-opt').forEach((opt) => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.muse-delivery-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // --- Checkout: paiement ---
  document.querySelectorAll('.muse-pay-method').forEach((method) => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.muse-pay-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      const isCard = method.querySelector('.muse-pay-name')?.textContent === 'Carte bancaire';
      const cardFields = document.querySelector('.muse-card-fields');
      if (cardFields) cardFields.style.display = isCard ? 'block' : 'none';
    });
  });

})();
