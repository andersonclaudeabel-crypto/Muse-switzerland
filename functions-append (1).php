
/* ─── MUSE VENDRE MES ARTICLES ───────────────────────────────────────────── */

/* ── TVA SUISSE 8.1% ──────────────────────────────────────────────────────── */

add_filter('woocommerce_get_price_suffix', function ($suffix, $product) {
    return ' <span class="muse-tva-suffix">TVA 8.1% incl.</span>';
}, 10, 2);

/* ── CHAMP TYPE VENDEUR (particulier / commerçant) ────────────────────────── */

add_action('dokan_seller_registration_form_end', function () {
    ?>
    <div class="dokan-form-group muse-seller-type-field">
        <label><?php esc_html_e('Type de compte', 'muse'); ?></label>
        <div class="muse-type-selector">
            <button type="button" class="muse-type-btn active" data-type="particulier">Particulier</button>
            <button type="button" class="muse-type-btn" data-type="commercant">Commerçant</button>
        </div>
        <input type="hidden" name="muse_seller_type" id="muse_seller_type" value="particulier">
    </div>
    <div class="muse-commercant-fields">
        <span class="muse-commercant-label">Informations société</span>
        <div class="muse-form-grid">
            <div class="muse-field">
                <label for="muse_company_name">Raison sociale</label>
                <input type="text" name="muse_company_name" id="muse_company_name">
            </div>
            <div class="muse-field">
                <label for="muse_uid">Numéro IDE (UID)</label>
                <input type="text" name="muse_uid" id="muse_uid" placeholder="CHE-123.456.789">
            </div>
        </div>
    </div>
    <?php
});

add_action('dokan_new_seller_created', function ($seller_id, $dokan_settings) {
    $type = isset($_POST['muse_seller_type'])
        ? sanitize_text_field($_POST['muse_seller_type'])
        : 'particulier';
    update_user_meta($seller_id, 'muse_seller_type', $type);
    if ($type === 'commercant') {
        if (!empty($_POST['muse_company_name'])) {
            update_user_meta($seller_id, 'muse_company_name', sanitize_text_field($_POST['muse_company_name']));
        }
        if (!empty($_POST['muse_uid'])) {
            update_user_meta($seller_id, 'muse_uid', sanitize_text_field($_POST['muse_uid']));
        }
    }
}, 10, 2);

/* ── CLASSE BODY SELON TYPE VENDEUR ───────────────────────────────────────── */

add_filter('body_class', function ($classes) {
    if (!is_user_logged_in()) return $classes;
    $seller_type = get_user_meta(get_current_user_id(), 'muse_seller_type', true);
    if ($seller_type) {
        $classes[] = 'muse-seller-' . sanitize_html_class($seller_type);
    }
    return $classes;
});

/* ── VALIDATION ANNONCE — PENDING PAR DÉFAUT ──────────────────────────────── */

add_filter('dokan_new_product_status', function ($status) {
    return 'pending';
});

add_action('dokan_new_product_added', function ($product_id, $post_data) {
    $product = wc_get_product($product_id);
    $seller  = dokan_get_seller_by_product($product_id);
    $to      = get_option('admin_email');
    $subject = '[MUSE] Nouvelle annonce à valider — ' . $product->get_name();
    $message = sprintf(
        "Nouvelle annonce soumise :\n\nProduit : %s\nVendeur : %s (%s)\nLien admin : %s",
        $product->get_name(),
        $seller->display_name,
        $seller->user_email,
        admin_url('post.php?post=' . $product_id . '&action=edit')
    );
    wp_mail($to, $subject, $message);
}, 10, 2);

/* ── BADGE ÉTAT PRODUIT ───────────────────────────────────────────────────── */

add_action('dokan_product_edit_after_main', function ($post, $post_data) {
    $etat  = get_post_meta($post->ID, '_muse_etat', true);
    $etats = [
        'neuf'          => 'Neuf avec étiquette',
        'tres-bon-etat' => 'Très bon état',
        'bon-etat'      => 'Bon état',
    ];
    ?>
    <div class="dokan-form-group muse-etat-field">
        <label><?php esc_html_e("État de l'article", 'muse'); ?> <span class="required">*</span></label>
        <div class="muse-badges-etat">
            <?php foreach ($etats as $key => $label) : ?>
                <button type="button"
                    class="muse-badge-etat <?php echo $etat === $key ? 'selected' : ''; ?>"
                    data-etat="<?php echo esc_attr($key); ?>">
                    <?php echo esc_html($label); ?>
                </button>
            <?php endforeach; ?>
        </div>
        <input type="hidden" name="muse_etat_article" id="muse_etat_article"
               value="<?php echo esc_attr($etat); ?>">
    </div>
    <?php
}, 10, 2);

add_action('dokan_product_updated', function ($product_id) {
    if (!empty($_POST['muse_etat_article'])) {
        $allowed = ['neuf', 'tres-bon-etat', 'bon-etat'];
        $etat    = sanitize_text_field($_POST['muse_etat_article']);
        if (in_array($etat, $allowed, true)) {
            update_post_meta($product_id, '_muse_etat', $etat);
        }
    }
});

add_action('dokan_new_product_added', function ($product_id) {
    if (!empty($_POST['muse_etat_article'])) {
        $allowed = ['neuf', 'tres-bon-etat', 'bon-etat'];
        $etat    = sanitize_text_field($_POST['muse_etat_article']);
        if (in_array($etat, $allowed, true)) {
            update_post_meta($product_id, '_muse_etat', $etat);
        }
    }
});

function muse_display_badge_etat($product_id = null) {
    if (!$product_id) $product_id = get_the_ID();
    $etat   = get_post_meta($product_id, '_muse_etat', true);
    $labels = [
        'neuf'          => 'Neuf avec étiquette',
        'tres-bon-etat' => 'Très bon état',
        'bon-etat'      => 'Bon état',
    ];
    if ($etat && isset($labels[$etat])) {
        echo '<span class="muse-badge-etat-display muse-etat-' . esc_attr($etat) . '">'
           . esc_html($labels[$etat])
           . '</span>';
    }
}
add_action('woocommerce_before_shop_loop_item_title', 'muse_display_badge_etat', 5);
add_action('woocommerce_single_product_summary',      'muse_display_badge_etat', 4);

/* ── SHORTCODE [muse_vendre_form] ─────────────────────────────────────────── */

add_shortcode('muse_vendre_form', function () {
    ob_start();
    ?>
    <div class="muse-vendre-wrap">

        <section class="muse-vendre-section" id="muse-step-1">
            <h2>Une vitrine pour vos pièces d'exception</h2>
            <p class="muse-section-intro">
                Muse Switzerland sélectionne et valorise la mode premium de seconde main.
                Particuliers et commerçants bienvenus. Chaque annonce est vérifiée avant publication.
            </p>
            <div class="muse-avantages">
                <div class="muse-avantage-card">
                    <h3>Validation sous 48h</h3>
                    <p>Votre annonce est vérifiée et mise en ligne rapidement.</p>
                </div>
                <div class="muse-avantage-card">
                    <h3>Paiement sécurisé</h3>
                    <p>Stripe Connect + TWINT. Virement sous 7 jours.</p>
                </div>
                <div class="muse-avantage-card">
                    <h3>Audience qualifiée</h3>
                    <p>Acheteurs suisses à la recherche de mode premium.</p>
                </div>
            </div>
            <div class="muse-commission">
                <div class="muse-commission-pct">15<sup>%</sup></div>
                <div class="muse-commission-detail">
                    <strong>Commission fixe sur le prix de vente final.</strong><br>
                    Aucun frais d'inscription. Vous recevez 85% du prix affiché.<br>
                    Ex. : article vendu CHF 200.– → vous recevez CHF 170.–
                    <span class="muse-tva-note">TVA 8.1% appliquée au checkout conformément au droit suisse.</span>
                </div>
            </div>
            <div class="muse-flux">
                <span class="muse-flux-step">Dépôt annonce</span>
                <span class="muse-flux-arrow">→</span>
                <span class="muse-flux-step">Vérif. photos</span>
                <span class="muse-flux-arrow">→</span>
                <span class="muse-flux-step">Validation MUSE</span>
                <span class="muse-flux-arrow">→</span>
                <span class="muse-flux-step final">Mise en ligne</span>
            </div>
        </section>

        <section class="muse-vendre-section" id="muse-step-2">
            <h2>Créer votre compte vendeur</h2>
            <p class="muse-section-intro">
                Un seul compte pour particuliers et commerçants.
                Après inscription, accès immédiat à votre tableau de bord.
            </p>
            <?php echo do_shortcode('[dokan-seller-registration]'); ?>
        </section>

        <section class="muse-vendre-section" id="muse-step-3">
            <h2>Déposer une annonce</h2>
            <p class="muse-section-intro">
                Articles de mode premium uniquement — pas de produits de marque MUSE Switzerland.
            </p>
            <?php echo do_shortcode('[dokan-dashboard]'); ?>
        </section>

    </div>
    <?php
    return ob_get_clean();
});
