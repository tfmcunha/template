<?php

namespace App\Http\Controllers;

use Rareloop\Lumberjack\Http\Controller as BaseController;
use Rareloop\Lumberjack\Page;

class Controller extends BaseController
{
  public static function getPostTypeArchive()
  {
    if (is_single() || is_archive()) {
      $archive_page_id = get_page_for_post_type();
      if ($archive_page_id) {
        return new Page($archive_page_id);
      }
    }
  }
}
