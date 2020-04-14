<?php

namespace App\Providers;

use Rareloop\Lumberjack\Providers\ServiceProvider;

class ACFServiceProvider extends ServiceProvider
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
    // add_action('acf/init', array($this, 'register_blocks'));
  }

  function register_blocks()
  {
    if (function_exists('acf_register_block')) {
      // Call to Action Blocks
      acf_register_block(array(
        'name'        => 'call_to_action',
        'title'        => __('Call to Action'),
        'description'    => __('Manages the content\'s available CTAs available to the user.'),
        'render_callback'  => array($this, 'block_render_callback'),
        'category'      => 'sundance-blocks',
        'icon'        => 'screenoptions',
        'keywords'      => array(),
      ));
    }
  }

  function block_render_callback($block)
  {
    // convert block name ("acf/testimonial") into path friendly slug ("testimonial")
    $slug = str_replace('acf/', '', $block['name']);

    // include a template part from within the "template-parts/block" folder
    if (file_exists(get_theme_file_path("/blocks/acf-{$slug}.php"))) {
      include(get_theme_file_path("/blocks/acf-{$slug}.php"));
    }
  }
}
