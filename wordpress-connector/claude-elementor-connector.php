<?php
/**
 * Plugin Name: Claude Elementor Connector
 * Description: Endpoint REST sicuri (solo amministratori, via Application Password) per creare/aggiornare pagine Elementor e importare template nella libreria da remoto.
 * Version: 1.0.0
 * Author: Nightlife Milan
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('claude/v1', '/ping', array(
        'methods'             => 'GET',
        'permission_callback' => 'claude_ec_can_use',
        'callback'            => 'claude_ec_ping',
    ));

    register_rest_route('claude/v1', '/elementor/page', array(
        'methods'             => 'POST',
        'permission_callback' => 'claude_ec_can_use',
        'callback'            => 'claude_ec_upsert_page',
    ));

    register_rest_route('claude/v1', '/elementor/template', array(
        'methods'             => 'POST',
        'permission_callback' => 'claude_ec_can_use',
        'callback'            => 'claude_ec_import_template',
    ));
});

function claude_ec_can_use() {
    return current_user_can('manage_options');
}

function claude_ec_ping() {
    return array(
        'ok'        => true,
        'site'      => home_url(),
        'wp'        => get_bloginfo('version'),
        'elementor' => defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : null,
        'user'      => wp_get_current_user()->user_login,
    );
}

/**
 * Crea o aggiorna una pagina costruita con Elementor.
 *
 * Body JSON:
 *  - title           (string, obbligatorio)
 *  - elementor_data  (array di elementi Elementor, obbligatorio — il campo "content" di un export)
 *  - slug            (string, opzionale)
 *  - status          (draft|publish|private, default draft)
 *  - page_id         (int, opzionale: se presente aggiorna la pagina esistente)
 *  - page_settings   (object, opzionale — es. {"hide_title":"yes"})
 *  - page_template   (string, opzionale — es. "elementor_canvas" o "elementor_header_footer")
 */
function claude_ec_upsert_page(WP_REST_Request $req) {
    $p = $req->get_json_params();

    if (empty($p['title']) || empty($p['elementor_data'])) {
        return new WP_Error('missing_fields', 'title e elementor_data sono obbligatori', array('status' => 400));
    }

    $allowed_status = array('draft', 'publish', 'private');
    $postarr = array(
        'post_type'   => 'page',
        'post_title'  => sanitize_text_field($p['title']),
        'post_status' => (isset($p['status']) && in_array($p['status'], $allowed_status, true)) ? $p['status'] : 'draft',
    );
    if (!empty($p['slug'])) {
        $postarr['post_name'] = sanitize_title($p['slug']);
    }

    if (!empty($p['page_id'])) {
        $postarr['ID'] = (int) $p['page_id'];
        $post_id = wp_update_post($postarr, true);
    } else {
        $post_id = wp_insert_post($postarr, true);
    }
    if (is_wp_error($post_id)) {
        return $post_id;
    }

    $data = $p['elementor_data'];
    if (is_array($data)) {
        $data = wp_json_encode($data);
    }

    update_post_meta($post_id, '_elementor_edit_mode', 'builder');
    update_post_meta($post_id, '_elementor_template_type', 'wp-page');
    if (defined('ELEMENTOR_VERSION')) {
        update_post_meta($post_id, '_elementor_version', ELEMENTOR_VERSION);
    }
    // wp_slash è necessario: update_post_meta fa unslash e senza corromperebbe il JSON.
    update_post_meta($post_id, '_elementor_data', wp_slash($data));

    if (!empty($p['page_settings']) && is_array($p['page_settings'])) {
        update_post_meta($post_id, '_elementor_page_settings', $p['page_settings']);
    }
    if (!empty($p['page_template'])) {
        update_post_meta($post_id, '_wp_page_template', sanitize_text_field($p['page_template']));
    }

    if (class_exists('\Elementor\Plugin')) {
        \Elementor\Plugin::$instance->files_manager->clear_cache();
    }

    return array(
        'ok'       => true,
        'page_id'  => $post_id,
        'edit_url' => admin_url('post.php?post=' . $post_id . '&action=elementor'),
        'view_url' => get_permalink($post_id),
    );
}

/**
 * Importa un template (formato export .json di Elementor) nella libreria Modelli salvati.
 *
 * Body JSON:
 *  - template (object, obbligatorio — l'intero JSON di export: {title, type, version, content, ...})
 */
function claude_ec_import_template(WP_REST_Request $req) {
    if (!class_exists('\Elementor\Plugin')) {
        return new WP_Error('no_elementor', 'Elementor non è attivo su questo sito', array('status' => 400));
    }

    $p = $req->get_json_params();
    if (empty($p['template'])) {
        return new WP_Error('missing_fields', 'template (oggetto JSON export Elementor) obbligatorio', array('status' => 400));
    }

    $result = \Elementor\Plugin::$instance->templates_manager->import_template(array(
        'fileData' => base64_encode(wp_json_encode($p['template'])),
        'fileName' => 'claude-template.json',
    ));

    if (is_wp_error($result)) {
        return $result;
    }

    return array('ok' => true, 'imported' => $result);
}
