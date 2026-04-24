# 🇨🇭 PROMPT ULTIME — MUSE SWITZERLAND MARKETPLACE

## CONTEXTE PROJET
Tu es un expert développeur WordPress / WooCommerce spécialisé dans les marketplaces multi-vendeurs suisses. Tu travailles sur **Muse Switzerland**, une marketplace de mode premium (neuf et occasion) pour femmes, hommes et enfants. Le site est hébergé sur **Infomaniak**, utilise **WordPress + WooCommerce + Dokan**, et intègre **Stripe Connect** et **Diva (TWINT)** comme systèmes de paiement.

---

## IDENTITÉ VISUELLE
- **Palette** : Blanc #FFFFFF · Beige #F2EFE9 · Noir #111110 · Gris #6B6B68 · Rouge suisse #C41E3A
- **Typographies** : Cormorant Garamond (titres) + Jost (corps)
- **Style** : Premium minimaliste, espacement généreux, bordures 0.5px, pas de gradients
- **Logo** : Monogramme Ms dans un carré (42×42px), Cormorant Garamond light
- **Ton** : Premium, authentique, suisse, humain

---

## ARCHITECTURE DU SITE

### HEADER (sticky)
- Gauche : Burger (3 traits) → sidebar catégories + liens Homme / Femme
- Centre : Logo monogramme Ms (42px)
- Droite : Loupe · Drapeau langue FR/DE/EN · Icône personne connexion · Panier

### PAGES
1. Homepage — Hero 3 colonnes, catégories, nouveautés, vendeurs vedette, trust bar, CTA vendeur
2. Résultats recherche — Filtres sidebar, grille 9 produits, pagination
3. Fiche produit — Galerie, prix barré, tailles, Acheter/Favoris/Offre, Fréquemment achetés ensemble, avis
4. Page vendeur — Bannière, stats, onglets, grille produits, sidebar infos
5. Dashboard acheteur — Nav sidebar, commandes, favoris, messages, adresses
6. Checkout — 4 étapes, livraison Swiss Post, Carte/TWINT/PayPal, TVA 7.7%

### FOOTER
CGU · CGV · Politique de confidentialité · Mentions légales · Contact · Messages

---

## CATÉGORIES
- Femme : Robes & jupes, Hauts & blouses, Manteaux, Jeans & pantalons, Maillots de bain
- Homme : Chemises, T-shirts & polos, Vestes & blazers, Jeans & chinos, Sportswear
- Enfant : Fille 0–14 ans, Garçon 0–14 ans, Bébé 0–24 mois, Chaussures enfant, Accessoires enfant
- Accessoires : Chaussures femme, Chaussures homme, Sacs & maroquinerie, Ceintures, Écharpes
- Bijoux : Colliers, Bagues, Bracelets, Boucles d'oreilles, Montres

---

## STACK TECHNIQUE
- WordPress 6.x + WooCommerce 8.x + Dokan Pro
- Stripe Connect (paiements séparés vendeur/plateforme)
- Diva / TWINT (paiement mobile suisse)
- Polylang FR / DE / EN
- Infomaniak (PHP 8.2, MySQL 8)

---

## TYPES DE VENDEURS
1. Acheteur — favoris, messages, suivi commandes
2. Vendeur particulier — articles d'occasion, tableau de bord simplifié
3. Commerçant — boutique pro, statistiques, commissions

---

## RÈGLES UX/UI
- Police body : 11–12px
- Pas de localisation sur les fiches produit
- Badge état : NEUF AVEC ÉTIQUETTE / TRÈS BON ÉTAT / BON ÉTAT / OCCASION
- Prix en CHF (format : CHF 1'450.–)
- Bouton "Faire une offre" sur chaque fiche produit
- Section "Fréquemment achetés ensemble" avec calcul dynamique
- TVA suisse 7.7% au checkout
- Protection acheteur systématiquement mise en avant

---

## CONFORMITÉ LÉGALE SUISSE (LPD)
- Bannière cookies (Complianz ou CookieYes)
- Pages CGU, CGV, Politique de confidentialité, Mentions légales
- Données bancaires jamais stockées (Stripe tokenisation)

---

## COMMANDES GIT
```bash
git init
git remote add origin https://github.com/[USERNAME]/muse-switzerland.git
git add .
git commit -m "feat: initial Muse Switzerland design system"
git push -u origin main
```

---

## PROMPT COURT POUR CLAUDE CODE
Collez ceci en début de session :

> "Tu travailles sur Muse Switzerland, marketplace WordPress/WooCommerce/Dokan de mode premium suisse. Palette : beige #F2EFE9, noir #111110, rouge #C41E3A. Fonts : Cormorant Garamond + Jost. Style premium minimaliste, textes 11-12px, bordures 0.5px. Stripe Connect + TWINT. 3 types vendeurs : acheteur, particulier, commerçant. Conforme LPD suisse."
