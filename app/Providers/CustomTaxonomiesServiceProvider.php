<?php
namespace App\Providers;

use Rareloop\Lumberjack\Providers\ServiceProvider;
// use Rareloop\Lumberjack\Config;
use Extended_CPT;

class CustomTaxonomiesServiceProvider extends ServiceProvider
{

  /**
   * Register any app specific items into the container
   */
  public function register()
  { }

  public function boot()
  {
    add_action('acf/init', array($this, 'register_taxonomies'));
  }

  function register_taxonomies()
  {

    $common_args = array(
      'show_in_rest' => true
    );

    register_extended_taxonomy('activity_type', 'activity', $common_args);
    register_extended_taxonomy('activity_season', 'activity', $common_args);

    register_extended_taxonomy('lodging_type', 'lodging', $common_args);
    register_extended_taxonomy('event_series', 'tribe_events', $common_args);
  }
}
