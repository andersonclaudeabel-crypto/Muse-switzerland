# MUSE SWITZERLAND — Guide de Setup complet

## ÉTAPE 1 — Plugins WordPress à installer
Dans votre admin WordPress > Extensions > Ajouter :
- WooCommerce
- Dokan Pro
- Polylang
- Complianz GDPR (cookies)

## ÉTAPE 2 — Stripe Connect dans Dokan
1. Dokan > Paramètres > Paiement > Stripe Connect
2. Ajouter clé publique et clé secrète Stripe
3. Activer le paiement séparé vendeur/plateforme

## ÉTAPE 3 — TWINT via Diva
1. Installer le plugin Diva WooCommerce
2. Renseigner votre Merchant ID Diva
3. Tester en mode sandbox avant mise en ligne

## ÉTAPE 4 — Langues Polylang
1. Polylang > Langues > Ajouter : Français (défaut), Deutsch, English
2. Traduire les pages, menus et emails WooCommerce

## ÉTAPE 5 — Injecter le CSS
Dans WordPress > Apparence > Personnaliser > CSS additionnel
Coller le contenu de : assets/css/muse-design-system.css

## ÉTAPE 6 — Commissions Dokan
- Vendeur particulier : 8% de commission
- Commerçant : 5% de commission
- Payout automatique après livraison confirmée

## ÉTAPE 7 — Conformité LPD (loi suisse)
- Activer Complianz pour la bannière cookies
- Créer les pages : CGU · CGV · Politique de confidentialité · Mentions légales
- Les données bancaires ne sont jamais stockées (Stripe s'en charge)

## ÉTAPE 8 — Git
```bash
git init
git remote add origin https://github.com/VOTRE_USERNAME/muse-switzerland.git
git add .
git commit -m "feat: initial commit Muse Switzerland"
git push -u origin main
```
