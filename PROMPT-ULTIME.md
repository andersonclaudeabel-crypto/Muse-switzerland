# MUSE SWITZERLAND — PROMPT DE REPRISE
## Version 1.0 — 1er mai 2026

---

## CONTEXTE DU PROJET

Je travaille sur **MUSE Switzerland** — marketplace de mode premium suisse.
URL : https://muse-switzerland.ch

**Stack technique :**
- WordPress + WooCommerce + Dokan Pro
- Divi (constructeur de pages)
- Polylang FR/DE/EN
- Stripe Connect + TWINT
- Infomaniak PHP 8.2
- Contact Form 7 + Flamingo
- WP Armour (anti-spam)

---

## IDENTITÉ VISUELLE

| Élément | Valeur |
|---|---|
| Beige | #F2EFE9 |
| Noir | #111110 |
| Rouge | #C41E3A |
| Gris | #6B6B68 |
| Titre | Cormorant Garamond |
| Corps | Jost |
| Prix | CHF 1'450.– |
| TVA | 8.1% |
| Commission | 15% fixe sur prix de vente |

---

## STRUCTURE DU SITE

### Pages terminées ✅
- `/` — Accueil : hero 3 blocs, mosaïque, catégories cliquables, trust bar, CTA vendeur
- `/femme/` — Hero + grille produits Woo
- `/homme/` — Hero + grille produits Woo
- `/accessoires/` — Hero (filtres à faire)
- `/collection-bijoux/` — Hero beige + grille Woo catégorie Bijoux
- `/collection-chaussures/` — Hero beige + grille Woo catégorie Chaussures
- `/collection-sacs/` — Hero beige + grille Woo catégorie Sacs
- `/collection-muse/` — Hero noir EMPREINTE + formulaire CF7 notification
- `/dashboard/` — Dashboard Dokan vendeur

### Header ✅
- 4 colonnes : Burger+FEMME+HOMME+ACCESSOIRES | Logo Ms | VENDRE MES ARTICLES | MON COMPTE | FR+loupe+compte+panier
- Lien "Vendre mes articles" → `/dashboard/`
- Lien "Mon compte" → `/mon-compte/`
- Menu burger overlay plein écran fonctionnel

### Catégories WooCommerce ✅
```
Femme (slug: femme)
Homme (slug: homme)
Accessoires (slug: accessoires)
  └── Chaussures (slug: chaussures)
      ├── Chaussures Femme (slug: chaussures-femme)
      └── Chaussures Homme (slug: chaussures-homme)
  └── Sacs (slug: sacs-accessoires)
  └── Chapeaux (slug: chapeaux)
  └── Ceintures (slug: ceintures-accessoires)
  └── Echarpes (slug: echarpes-accessoires)
Bijoux (slug: bijoux)
  ├── Bijoux Femme (slug: bijoux-femme)
  └── Bijoux Homme (slug: bijoux-homme)
```

### Permaliens WooCommerce
- Préfixe catégories : `categorie-produit`
- Base produit : `produit/`
- URLs catégories : `/categorie-produit/[slug]/`
- Pages Divi catégories : `/collection-[nom]/`

---

## COLLECTION MUSE — EMPREINTE

- Première collection MUSE Switzerland
- Phrase : *« L'authenticité est le seul luxe qui ne se copie pas. »*
- Statut : À venir — Collection 2026
- Formulaire notification : CF7 id="7f67c55" + Flamingo pour stockage
- Page : `/collection-muse/`

---

## DOKAN PRO — CONFIGURATION

| Paramètre | Valeur |
|---|---|
| Activation vendeur | Manuelle (admin valide) |
| Nouveaux produits | Pending review |
| Dashboard style | New UI |
| Commission | 15% fixe |
| Paiement | Stripe Connect + TWINT |

### Rôles vendeur
- **Particulier** — dashboard simplifié, volume illimité
- **Commerçant** — dashboard complet, infos société (raison sociale + UID)

---

## FICHIERS TECHNIQUES

### functions-append.php
À coller à la fin de `/wp-content/themes/divi-child/functions.php`
Contient :
- TVA 8.1% suffix sur fiches produit
- Champ type vendeur (particulier/commerçant) à l'inscription Dokan
- Classe body selon type vendeur
- Validation annonce pending par défaut
- Email admin à chaque nouvelle annonce
- Badge état produit (Neuf / Très bon état / Bon état)
- Shortcode `[muse_vendre_form]`

### muse-vendre.css
Styles page vendeur + overrides Dokan
À ajouter dans Apparence → Personnaliser → CSS additionnel

### muse-vendre.js
À coller dans Divi → Options du thème → Intégration → body
Entre balises `<script></script>`

### muse-css-additionnel-clean.css
CSS additionnel WordPress complet et propre
Remplace tout le contenu de Apparence → Personnaliser → CSS additionnel

---

## PROCHAINES ÉTAPES ⏳

### 1. Filtres accessoires
- Page `/accessoires/` — filtrer produits par sous-catégorie
- Chaussures / Sacs / Chapeaux / Ceintures / Echarpes

### 2. Checkout TVA 8.1%
- WooCommerce → Réglages → Taxes → Taux standard 8.1% CH
- Stripe Connect + TWINT à configurer
- Format prix suisse CHF

### 3. Fiche produit — badges état
- Affichage badge sur loop et single product
- Meta `_muse_etat` : neuf / tres-bon-etat / bon-etat
- Déjà préparé dans functions-append.php

### 4. Style Dashboard Dokan
- Variables CSS `--dokan-sidebar-background-color` etc.
- À traiter après les étapes prioritaires

### 5. Traductions Polylang
- FR (principal) → DE → EN
- Pages à dupliquer et traduire

---

## PRODUITS IMPORTÉS

| Catégorie | Nombre |
|---|---|
| Femme | 20 |
| Homme | 18 |
| Accessoires | 10 |
| **Total** | **48** |

---

## NOTES IMPORTANTES

- Le JS ne doit **jamais** être collé dans le CSS additionnel
- Les slugs des pages Divi catégories commencent par `collection-` pour éviter les conflits avec les catégories WooCommerce
- Purger le cache Infomaniak après chaque modification importante
- Flamingo stocke les inscriptions CF7 dans WordPress → Contact → Flamingo
- anderson_20 = compte vendeur test (approuvé)
