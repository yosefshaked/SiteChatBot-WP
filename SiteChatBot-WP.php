<?php
/**
 * Plugin Name: SiteChatBot-WP
 * Description: בוט שיחה צף עם תפריט כפתורים המבוסס על צעדי שיחה הנוצרים כטיפוס פוסט ייעודי.
 * Version: 1.0
 * Author: OpenAI Assistant
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the chatbot conversation step custom post type.
 */
function scbwp_register_cpt() {
    $labels = array(
        'name'               => 'צעדי שיחה לבוט',
        'singular_name'      => 'צעד שיחה לבוט',
        'add_new'            => 'הוסף צעד חדש',
        'add_new_item'       => 'הוסף צעד שיחה חדש לבוט',
        'edit_item'          => 'ערוך צעד שיחה לבוט',
        'new_item'           => 'צעד שיחה חדש',
        'view_item'          => 'צפה בצעד שיחה',
        'search_items'       => 'חפש צעדי שיחה',
        'not_found'          => 'לא נמצאו צעדי שיחה',
        'not_found_in_trash' => 'לא נמצאו צעדי שיחה באשפה',
        'menu_name'          => 'צעדי שיחה לבוט',
    );

    register_post_type(
        'scbwp_qa',
        array(
            'labels'              => $labels,
            'description'         => 'הכותרת חייבת להיות מזהה ייחודי באנגלית (לדוגמה main_menu). התוכן צריך להכיל את הודעת הבוט ושורות כפתורים בפורמט [option link_to="target_slug"]כיתוב הכפתור[/option].',
            'public'              => false,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'menu_icon'           => 'dashicons-format-chat',
            'show_in_nav_menus'   => false,
            'exclude_from_search' => true,
            'supports'            => array( 'title', 'editor' ),
        )
    );
}
add_action( 'init', 'scbwp_register_cpt' );

/**
 * Enqueue frontend assets and pass conversation data to the script.
 */
function scbwp_enqueue_assets() {
    $plugin_url = plugin_dir_url( __FILE__ );

    wp_enqueue_style(
        'scbwp-frontend-style',
        $plugin_url . 'assets/css/frontend-style.css',
        array(),
        '1.0'
    );

    wp_enqueue_script(
        'scbwp-frontend-script',
        $plugin_url . 'assets/js/frontend-script.js',
        array( 'jquery' ),
        '1.0',
        true
    );

    $posts = get_posts(
        array(
            'post_type'      => 'scbwp_qa',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
        )
    );

    $steps = array();
    $pattern = '/\[option\s+link_to="([^\"]+)"\](.*?)\[\/option\]/u';

    foreach ( $posts as $post ) {
        $options = array();
        $content = $post->post_content;

        if ( preg_match_all( $pattern, $content, $matches, PREG_SET_ORDER ) ) {
            foreach ( $matches as $match ) {
                $link_to    = sanitize_key( $match[1] );
                $button_txt = wp_kses_post( $match[2] );
                $options[]  = array(
                    'text'    => wp_strip_all_tags( $button_txt ),
                    'link_to' => $link_to,
                );
            }
        }

        $clean_content = preg_replace( $pattern, '', $content );
        $clean_content = wp_kses_post( $clean_content );
        $message       = wpautop( trim( $clean_content ) );

        $step_key = sanitize_key( $post->post_title );

        $steps[ $step_key ] = array(
            'message' => $message,
            'options' => $options,
        );
    }

    wp_localize_script(
        'scbwp-frontend-script',
        'siteChatBotData',
        array(
            'steps'      => $steps,
            'start_step' => 'main_menu',
        )
    );
}
add_action( 'wp_enqueue_scripts', 'scbwp_enqueue_assets' );

/**
 * Output the chatbot HTML markup in the footer.
 */
function scbwp_inject_footer_html() {
    ?>
    <button class="chatbot-toggle-button" type="button" aria-label="פתח צ'אט"><span class="icon-wrapper">💬</span></button>
    <div class="chatbot-container" role="dialog" aria-live="polite" aria-label="בוט שיחה" aria-hidden="true">
        <div class="chatbot-header">
            <span>בוט האתר</span>
            <button class="chatbot-close-button" type="button" aria-label="סגירה">&times;</button>
        </div>
        <div class="chatbot-messages" tabindex="-1"></div>
        <div class="chatbot-options" aria-label="אפשרויות בחירה"></div>
    </div>
    <?php
}
add_action( 'wp_footer', 'scbwp_inject_footer_html' );
