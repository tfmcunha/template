<?php

namespace App\Providers;

use Rareloop\Lumberjack\Providers\ServiceProvider;

class AssetsServiceProvider extends ServiceProvider
{
  /**
   * Register any app specific items into the container
   */
  public function register()
  { }

  /**
   * Perform any additional boot required for this application
   */
  public function boot()
  {
    add_action('wp_enqueue_scripts', function () {

      $theme_version = "20200413_11";

      $base_url = esc_url_raw(home_url());
      $base_path = rtrim(parse_url($base_url, PHP_URL_PATH), '/');

      wp_enqueue_style('all-css', get_template_directory_uri() . '/build/styles/main.css', array(), $theme_version);

      if (WP_DEBUG) {

        wp_register_script('app', get_stylesheet_directory_uri() . '/build/scripts/main.js', array('jquery'), $theme_version, true);
        // needs to come after app so that it can dispatch events correctly
        //wp_enqueue_script('webfonts', get_stylesheet_directory_uri() . '/build/js/webfonts.js', array(), $theme_version, false);
        wp_localize_script('app', 'wp', array(
          'ajax_url' => admin_url('admin-ajax.php'),
          'root' => esc_url_raw(rest_url()),
          'base_url' => $base_url,
          'base_path' => $base_path ? $base_path . '/' : '/',
          'nonce' => wp_create_nonce('wp_rest'),
          'site_name' => get_bloginfo('name')
        ));
        wp_enqueue_script('app');
      } else {

        wp_register_script('app', get_stylesheet_directory_uri() . '/build/scripts/main.js', array('jquery'), $theme_version, true);
        // needs to come after app so that it can dispatch events correctly
        //wp_enqueue_script('webfonts', get_stylesheet_directory_uri() . '/build/js/webfonts.min.js', array(), $theme_version, false);
        wp_localize_script('app', 'wp', array(
          'ajax_url' => admin_url('admin-ajax.php'),
          'root' => esc_url_raw(rest_url()),
          'base_url' => $base_url,
          'base_path' => $base_path ? $base_path . '/' : '/',
          'nonce' => wp_create_nonce('wp_rest'),
          'site_name' => get_bloginfo('name')
        ));
        wp_enqueue_script('app');
      }
    });

    // add_action('enqueue_block_editor_assets', function () {
    //   wp_enqueue_style('sundance-editor-styles', get_theme_file_uri('/build/styles/editor.css'), false, '1.0', 'all');
    // });
  }
}
