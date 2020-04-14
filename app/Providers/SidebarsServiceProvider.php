<?php

namespace App\Providers;

use Rareloop\Lumberjack\Providers\ServiceProvider;

class SidebarsServiceProvider extends ServiceProvider
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
    add_action('widgets_init', array($this, 'init_sidebars'));
  }

  function init_sidebars()
  {
    register_sidebar(array(
      'name' => 'Dining Single Sidebar',
      'id' => 'dining-single-sidebar',
      'description' => 'Widgets to be displayed on the Single post view',
      'before_widget' => '<li id="%1$s" class="widget %2$s">',
      'after_widget'  => '</li>',
      'before_title'  => '<h2 class="widgettitle">',
      'after_title'   => '</h2>',
    ));

    register_sidebar(array(
      'name' => 'Lodging Filters',
      'id' => 'lodging_filters',
      'description' => '',
      'before_widget' => '<li id="%1$s" class="widget %2$s">',
      'after_widget'  => '</li>',
      'before_title'  => '<h2 class="widgettitle">',
      'after_title'   => '</h2>',
    ));
  }
}
