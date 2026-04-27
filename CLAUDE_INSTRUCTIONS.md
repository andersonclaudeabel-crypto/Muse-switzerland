# MUSE SWITZERLAND — Instructions complètes Claude

## IDENTITÉ VISUELLE
- Couleurs : Beige `#F2EFE9` · Noir `#111110` · Rouge `#C41E3A` · Gris `#6B6B68`
- Polices : Cormorant Garamond (titres) + Jost (corps)
- Style : Premium minimaliste, bordures 0.5px, textes 11-12px
- Prix format suisse : CHF 1'450.–
- TVA suisse 7.7% au checkout

---

## STACK TECHNIQUE
- WordPress + WooCommerce + Dokan Pro
- Thème : Divi + thème enfant "Muse Switzerland Child"
- Paiements : Stripe Connect + Diva (TWINT)
- Langues : Polylang FR/DE/EN
- Hébergement : Infomaniak PHP 8.2
- GitHub : https://github.com/andersonclaudeabel-crypto/Muse-Suisse

---

## HEADER (✅ TERMINÉ)
- Structure 3 colonnes : burger+nav gauche | logo Ms centré | icônes droite
- Gauche : Burger ≡ (3 barres) + FEMME + HOMME en Jost 11px uppercase
- Centre : Logo Ms monogramme SVG 42px dans carré bordure 0.75px
- Droite : FR + loupe + compte + panier (SVG stroke 1.2px)
- Menu burger overlay plein écran : Femme, Homme, Enfant, Accessoires, Mon compte, Vendre mes articles
- Header sticky avec transition scroll

---

## PAGE D'ACCUEIL — Structure complète

### 1 — MOSAÏQUE (✅ TERMINÉ)
- 4 images pleine largeur entre header et hero
- Images : alyssa-strohmann / zoe / gary-yost / leonie-giardini
- Texte overlay : "✦ Offre exclusive / Livraison gratuite dès CHF 150.–" en blanc

### 2 — HERO (✅ TERMINÉ)
- 3 colonnes : photo femme | texte centre | photo homme
- 3 boutons : DÉCOUVRIR LA COLLECTION (noir) / VENDRE MES ARTICLES (contour noir) / DEVENIR VENDEUR (contour rouge)

### 3 — CITATION (✅ TERMINÉ)
- « La mode premium et authentique — Votre marketplace Suisse »

### 4 — CHIFFRES CLÉS (✅ TERMINÉ)
- Fond beige #F2EFE9
- 320 VENDEURS · 12K+ ARTICLES · CH MARKETPLACE

### 5 — CATÉGORIES (✅ TERMINÉ)
- Fond beige #F2EFE9
- Titre PARCOURIR PAR / Catégories (36px)
- 6 colonnes : FEMME · HOMME · ENFANT · CHAUSSURES · SACS · BIJOUX

### 6 — TRUST BAR (✅ TERMINÉ)
- Fond beige #F2EFE9
- 4 colonnes avec ✦ rouge

### 7 — CTA VENDEUR (✅ TERMINÉ)
- Fond noir pleine largeur 100vw

### 8 — FOOTER (✅ TERMINÉ)
- Fond beige 4 colonnes + barre copyright noire

---

## PAGE FEMME (🔄 EN COURS)
- Bandeau hero avec citation « Parce que vous êtes toutes des muses »
- Module Produits Woo ajouté — configuration en cours (4 colonnes)
- Prochaine étape : filtres + style grille produits

---

## PAGE HOMME (⏳ À FAIRE)
## FICHE PRODUIT (⏳ À FAIRE)
## CHECKOUT (⏳ À FAIRE)

---

## RÈGLES DIVI IMPORTANTES
- Pleine largeur : `width:100vw;position:relative;left:50%;transform:translateX(-50%);`
- Fond beige via Divi : Contenu → Fond → #F2EFE9
- Ne jamais écraser le CSS existant — toujours ajouter à la fin
- Espacement : Contenu → Espacement → Marge interne à 0

---

## PROCHAINES ÉTAPES
1. Finir page Femme (filtres + style grille)
2. Page Homme
3. Fiche produit avec badges état
4. Checkout TVA 7.7%
5. Mobile responsive
