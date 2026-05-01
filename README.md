# MUSE SWITZERLAND — Vendre mes articles
## Intégration Divi + Dokan Pro

### Fichiers livrés
- `muse-vendre.css` → styles page + overrides Dokan
- `muse-vendre.js` → interactions (badges état, bascule vendeur, calcul commission)
- `functions-muse-vendre.php` → hooks PHP (TVA 8.1%, rôles, validation, shortcode)

---

### 1. CSS
Coller dans **Apparence → Personnaliser → CSS additionnel**
ou dans `assets/css/muse-design-system.css` si vous avez ce fichier.

---

### 2. JS
Coller dans **Divi → Options du thème → Intégration → body** :
```html
<script src="/wp-content/themes/votre-theme-enfant/assets/js/muse-vendre.js" defer></script>
```

---

### 3. PHP
Copier le contenu de `functions-muse-vendre.php` dans le `functions.php`
de votre **thème enfant Divi** (pas le thème parent).

---

### 4. Page Divi /vendre-mes-articles/

1. Créer une nouvelle page WordPress : **Vendre mes articles** / slug `vendre-mes-articles`
2. Ouvrir avec l'éditeur Divi
3. Structure de la page :

```
Section 1 — Hero (plein largeur, fond #111110)
  └── Rangée 1 colonne
      └── Module Texte :
          <div class="muse-vendre-hero">
            <p>Muse Switzerland — Marketplace</p>
            <h1>Vendre mes articles</h1>
            <p>Déposez vos pièces de mode premium</p>
          </div>

Section 2 — Contenu (fond blanc)
  └── Rangée 1 colonne
      └── Module Code : [muse_vendre_form]
```

---

### 5. TVA 8.1%

Dans **WooCommerce → Réglages → Taxes** :
- Activer les taxes ✓
- Taux standard : **8.1%** · Pays : CH · Nom : TVA

Le hook PHP `woocommerce_get_price_suffix` affiche automatiquement
"TVA 8.1% incl." sur toutes les fiches produit.

---

### 6. Dokan — Configuration vendeur

Dans **Dokan → Réglages → Vendeur** :
- Activation vendeur : **Manuelle** (admin valide)
- Produits nouveaux : **Pending** (déjà forcé par hook PHP)
- Dashboard : activer tous les modules (le CSS masque ceux inutiles pour les particuliers)

---

### 7. Badges état

Les 3 badges sont enregistrés comme meta produit `_muse_etat` :
- `neuf` → Neuf avec étiquette
- `tres-bon-etat` → Très bon état
- `bon-etat` → Bon état

Affichés automatiquement sur la loop et la fiche produit via hooks WooCommerce.

---

### 8. Emails de notification

L'admin reçoit un email à chaque nouvelle annonce soumise.
Configurer l'adresse dans **Réglages WordPress → Général → Adresse e-mail**.
