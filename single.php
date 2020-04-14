<?php

namespace App;

use Timber\Timber;
// use App\PostTypes\ArtStudio;
use Rareloop\Lumberjack\Post;
use Rareloop\Lumberjack\Helpers;
use App\ViewModels\EventViewModel;
use App\Http\Controllers\Controller;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;

class SingleController extends Controller
{
  public function handle()
  {

    $context = Timber::get_context();

    $templates = array(get_post_type() . '/single.twig', 'single.twig', 'index.twig');
    $context['post'] = $post;

    return new TimberResponse($templates, $context);
  }
}
