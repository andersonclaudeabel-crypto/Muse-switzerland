/**
 * MUSE SWITZERLAND — Vendre mes articles
 * Interactions : sélection badge état, bascule particulier/commerçant,
 *                classe Dokan sur body, TVA 8.1%
 */

(function () {
  'use strict';

  /* ── 1. Badges état (étape 3) ────────────────────────────────────────── */
  document.querySelectorAll('.muse-badge-etat').forEach(function (badge) {
    badge.addEventListener('click', function () {
      document.querySelectorAll('.muse-badge-etat').forEach(function (b) {
        b.classList.remove('selected');
      });
      this.classList.add('selected');

      /* Synchronise avec le champ hidden Dokan si présent */
      var hiddenField = document.querySelector('input[name="muse_etat_article"]');
      if (hiddenField) {
        hiddenField.value = this.dataset.etat || this.textContent.trim();
      }
    });
  });

  /* ── 2. Bascule Particulier / Commerçant (étape 2) ───────────────────── */
  var typeButtons = document.querySelectorAll('.muse-type-btn');
  var commercantFields = document.querySelector('.muse-commercant-fields');
  var sellerTypeInput = document.querySelector('input[name="muse_seller_type"]');

  typeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      typeButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var type = this.dataset.type;

      /* Afficher champs commerçant */
      if (commercantFields) {
        if (type === 'commercant') {
          commercantFields.classList.add('visible');
        } else {
          commercantFields.classList.remove('visible');
        }
      }

      /* Classe body pour Dokan dashboard */
      document.body.classList.remove('muse-seller-particulier', 'muse-seller-commercant');
      document.body.classList.add('muse-seller-' + type);

      /* Champ hidden pour transmission à Dokan */
      if (sellerTypeInput) {
        sellerTypeInput.value = type;
      }

      /* Cookie 30 jours */
      document.cookie = 'muse_seller_type=' + type + '; path=/; max-age=' + (60 * 60 * 24 * 30);
    });
  });

  /* ── 3. Restaurer le type vendeur depuis cookie (dashboard) ──────────── */
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  var savedType = getCookie('muse_seller_type');
  if (savedType) {
    document.body.classList.add('muse-seller-' + savedType);

    var savedBtn = document.querySelector('.muse-type-btn[data-type="' + savedType + '"]');
    if (savedBtn) {
      savedBtn.click();
    }
  }

  /* ── 4. Calcul commission en temps réel ──────────────────────────────── */
  var COMMISSION_RATE = 0.15; /* 15% fixe */
  var TVA_RATE = 0.081;       /* 8.1% Suisse 2024 */

  var priceInput = document.querySelector('.muse-price-input');
  var netDisplay = document.querySelector('.muse-net-display');
  var tvaDisplay = document.querySelector('.muse-tva-display');

  if (priceInput && netDisplay) {
    priceInput.addEventListener('input', function () {
      var raw = this.value.replace(/[^0-9.]/g, '');
      var price = parseFloat(raw);

      if (!isNaN(price) && price > 0) {
        var commission = price * COMMISSION_RATE;
        var net = price - commission;
        var tva = net * TVA_RATE;

        netDisplay.textContent = 'CHF ' + formatCHF(net);
        if (tvaDisplay) {
          tvaDisplay.textContent = 'dont TVA 8.1% : CHF ' + formatCHF(tva);
        }
      } else {
        netDisplay.textContent = 'CHF —';
        if (tvaDisplay) tvaDisplay.textContent = '';
      }
    });
  }

  /* Format prix suisse : CHF 1'450.– */
  function formatCHF(amount) {
    var rounded = Math.round(amount * 100) / 100;
    var parts = rounded.toFixed(2).split('.');
    var intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    var decPart = parts[1] === '00' ? '–' : parts[1];
    return intPart + '.' + decPart;
  }

  /* ── 5. Upload photos — preview simple ──────────────────────────────── */
  var uploadZone = document.querySelector('.muse-upload-zone');
  var fileInput = document.querySelector('.muse-upload-input');

  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', function () {
      fileInput.click();
    });

    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      this.style.borderColor = '#111110';
    });

    uploadZone.addEventListener('dragleave', function () {
      this.style.borderColor = '';
    });

    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault();
      this.style.borderColor = '';
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function () {
      handleFiles(this.files);
    });
  }

  function handleFiles(files) {
    var preview = document.querySelector('.muse-upload-preview');
    if (!preview) return;

    Array.from(files).forEach(function (file) {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 10 * 1024 * 1024) {
        alert('Photo trop lourde (max 10 Mo) : ' + file.name);
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        img.style.cssText = 'width:80px;height:80px;object-fit:cover;border-radius:4px;border:0.5px solid rgba(17,17,16,0.2)';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  /* ── 6. Dokan — hook post-inscription pour assigner le rôle ─────────── */
  /*
   * À placer dans functions.php du thème enfant :
   *
   * add_action('dokan_new_seller_created', function($seller_id, $dokan_settings) {
   *   $type = isset($_POST['muse_seller_type']) ? sanitize_text_field($_POST['muse_seller_type']) : 'particulier';
   *   update_user_meta($seller_id, 'muse_seller_type', $type);
   *   if ($type === 'particulier') {
   *     update_user_meta($seller_id, 'dokan_enable_selling', 'yes');
   *     // Masquer modules avancés via classe body (voir CSS)
   *   }
   * }, 10, 2);
   */

})();
