<?php

namespace App\ViewModels;

use Timber\Post;
use Rareloop\Lumberjack\ViewModel;
use Rareloop\Lumberjack\QueryBuilder;
use App\PostTypes\Event;

class EventViewModel extends ViewModel
{
  protected $post;

  public function __construct(Post $post)
  {
    $this->post = $post;
  }

  public function nextEvent()
  {
    if (eo_recurs($this->post->ID)) {
      return eo_get_next_occurrence_of($this->post->ID);
    }
    return false;
  }

  public function upcoming()
  {
    $upcoming = new \Timber\PostQuery(
      array(
        'post_type'         => 'event',
        'event_start_after' => 'today',
        'posts_per_page'    => 6,
        'event_series'      => $this->post->ID,
        'group_events_by'   => 'occurrence',
      ),
      'App\PostTypes\Event'
    );
    return $upcoming;
  }
}
