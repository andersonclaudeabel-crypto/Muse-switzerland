<?php
defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', 'muse_child_enqueue_assets', 20 );

function muse_child_enqueue_assets() {

    // Google Fonts : Cormorant Garamond (titres) + Jost (corps)
    wp_enqueue_style(
        'muse-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap',
        array(),
        null
    );

    // Feuille de style parente Divi
    wp_enqueue_style(
        'divi-parent-style',
        get_template_directory_uri() . '/style.css',
        array( 'muse-google-fonts' )
    );

    // Design system Muse Switzerland
    wp_enqueue_style(
        'muse-design-system',
        get_stylesheet_directory_uri() . '/assets/css/muse-design-system.css',
        array( 'divi-parent-style' ),
        '1.0.0'
    );
}
