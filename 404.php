<?php

/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

namespace App;

use App\Http\Controllers\Controller;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;
use Timber\Timber;

class Error404Controller extends Controller
{
  public function handle()
  {

    $context = Timber::get_context();
    return new TimberResponse('404.twig', $context);
  }
}
