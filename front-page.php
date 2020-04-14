<?php

namespace App;

use App\Http\Controllers\Controller;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;
use Rareloop\Lumberjack\Page;
use Timber\Timber;

class FrontPageController extends Controller
{
  public function handle()
  {
    $context = Timber::get_context();
    $page = new Page();

    $context['post'] = $page;
    $context['title'] = $page->title;
    $context['content'] = $page->content;

    return new TimberResponse('home/home.twig', $context);
  }
}
