<?php

/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 */

namespace App;

use Timber\Timber;
use App\Http\Controllers\Controller;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;
use App\PostTypes\Press;

class ArchiveController extends Controller
{
  public function handle()
  {

    $context = Timber::get_context();

    // We use pages to hold the CPT archives
    $post = $this->getPostTypeArchive();
    $context['post'] = $post;
    $context['postType'] = get_post_type();

    $templates = array(get_post_type() . '/archive.twig', 'archive.twig', 'index.twig');

    switch ($context['postType']) {
      /* case 'press':
        $context['posts'] = Press::all();
        array_unshift($templates, 'page/page-press.twig');
        break; */
      /* case 'news':
        $context['posts'] = News::all();
        array_unshift($templates, 'page/page-news.twig');
        break; */

      default:
        # code...
        break;
    }

    return new TimberResponse($templates, $context);
  }
}
