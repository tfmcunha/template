<?php

/* COMPOSER */
require_once('vendor/autoload.php');

use App\Http\Lumberjack;

// Create the Application Container
$app = require_once('bootstrap/app.php');

// Bootstrap Lumberjack from the Container
$lumberjack = $app->make(Lumberjack::class);
$lumberjack->bootstrap();

// Import our routes file
require_once('routes.php');

// Set global params in the Timber context
add_filter('timber_context', [$lumberjack, 'addToContext']);
add_filter('timber/twig', [$lumberjack, 'addToTwig']);

define('THEME_DIR', get_template_directory());

if (WP_DEBUG) {
  $loader = new TimberLoader();
  $loader->clear_cache_timber();
  $loader->clear_cache_twig();
}


/**
 * ----------------------------------------------------------------------------
 * LIBRARIES
 * ----------------------------------------------------------------------------
 */
// require_once(THEME_DIR . '/vendor/johnbillion/extended-cpts/extended-cpts.php');

// if (class_exists('Jigsaw')) {
//   Jigsaw::add_css('build/css/admin.css');
// }

add_post_type_support('page', 'excerpt');


// Temporary fix for incompatibility with PHP7.2
function warning_squelch_wpe(int $errno, string $errstr, string $errfile, int $errline, array $errcontext)
{
  if (strstr($errstr, "expected to be a reference")) {
    return true; // squelch matching warnings
  }
  // allow normal handling for non-matching warnings
  return false;
}
set_error_handler("warning_squelch_wpe", E_WARNING);
