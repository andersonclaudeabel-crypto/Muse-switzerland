# MUSE SWITZERLAND — Instructions complètes

## IDENTITÉ VISUELLE

- Couleurs : Beige `#F2EFE9` · Noir `#111110` · Rouge `#C41E3A` · Gris `#6B6B68`
- Polices : Cormorant Garamond (titres) + Jost (corps)
- Style : Premium minimaliste, bordures 0.5px, textes 11-12px

---

## HEADER

- Gauche : Burger menu (3 traits) + Homme + Femme
- Centre : Logo Ms monogramme 60px dans carré
- Droite : Loupe + Drapeau langue (FR/DE/EN) + Icône personne + Panier

---

## PAGE D'ACCUEIL — Structure dans l'ordre

### 1 — HERO (3 colonnes)
- Colonne gauche : Photo mode femme
- Colonne centre : MARKETPLACE SUISSE · MODE & ACCESSOIRES (rouge, 10px) + MUSE SWITZERLAND (Cormorant, 48px) + "La mode premium et authentique" (14px) + Bouton noir "DÉCOUVRIR LA COLLECTION" + Bouton contour "VENDRE MES ARTICLES"
- Colonne droite : Photo mode homme

### 2 — CITATION (fond blanc, alignée à droite)
- « La mode premium et authentique — Votre marketplace Suisse » (Cormorant, 28px, italique)

### 3 — CHIFFRES CLÉS (3 colonnes, fond beige `#F2EFE9`)
- 320 / VENDEURS ACTIFS
- 12K+ / ARTICLES EN LIGNE
- CH (rouge) / MARKETPLACE SUISSE

### 4 — CATÉGORIES (fond beige `#F2EFE9`)
- Titre : PARCOURIR PAR / Catégories
- 6 colonnes avec photos : FEMME · HOMME · ENFANT · CHAUSSURES · SACS · BIJOUX
- Images height 280px

### 5 — TRUST BAR (fond beige `#F2EFE9`, 4 colonnes)
- ✦ rouge · Protection acheteur · Remboursement selon nos CGV
- ✦ rouge · Paiement sécurisé · Stripe, TWINT, Visa & Mastercard
- ✦ rouge · Vendeurs vérifiés · Chaque compte contrôlé avant activation
- ✦ rouge · Retours simplifiés · 14 jours pour changer d'avis

### 6 — CTA VENDEUR (fond noir `#111110`)
- REJOIGNEZ LA COMMUNAUTÉ (rouge)
- "Vous avez quelque chose à vendre ?" (Cormorant, 32px, blanc)
- "Particuliers et commerçants suisses..." (gris)
- "Vous êtes commerçant ? Découvrez notre offre pro →" (blanc)
- Bouton blanc "COMMENCER À VENDRE"

### 7 — FOOTER (fond beige `#F2EFE9`, 4 colonnes)
- MUSE SWITZERLAND · MARKETPLACE · description
- LÉGAL : CGU · CGV · Politique de confidentialité · Mentions légales
- AIDE : Contact · Messages · Comment vendre ? · Comment acheter ?
- À PROPOS : Qui sommes-nous ? · Devenir vendeur · Presse · Partenaires

### 8 — BARRE COPYRIGHT (fond noir)
- © 2026 MUSE SWITZERLAND · TOUS DROITS RÉSERVÉS
- Badges : STRIPE · TWINT · VISA · MASTERCARD

---

## STACK TECHNIQUE

- WordPress + WooCommerce + Dokan Pro
- Thème : Divi + thème enfant "muse-switzerland-child"
- Paiements : Stripe Connect + Diva (TWINT)
- Langues : Polylang FR/DE/EN
- Hébergement : Infomaniak
- PHP : 8.2

---

## RÈGLES IMPORTANTES

- Prix format suisse : CHF 1'450.–
- TVA suisse 7.7% au checkout
- Section "Fréquemment achetés ensemble" sur fiches produit
- Badge état : NEUF AVEC ÉTIQUETTE / TRÈS BON ÉTAT / BON ÉTAT
- Conforme LPD (loi suisse protection des données)
- CSS dans : assets/css/muse-design-system.css
- JS dans : assets/js/muse-main.js

---

## PROCHAINES ÉTAPES

- [x] Logo Ms dans le header Divi
- [x] Réduire les espaces blancs entre sections
- [x] Fond beige sur section chiffres clés et trust bar
- [x] Sauvegarder sur GitHub
- [ ] Pages : Homme, Femme, Fiche produit, Checkout
- [ ] Intégrer CSS/JS dans thème enfant Divi
- [ ] Configurer Polylang FR/DE/EN
- [ ] Configurer Stripe Connect + TWINT
