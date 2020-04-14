<?php

namespace App\PostTypes;

use Rareloop\Lumberjack\Page;
use Rareloop\Lumberjack\QueryBuilder;

class MyPage extends Page
{
  /**
   * Return the key used to register the post type with WordPress
   * First parameter of the `register_post_type` function:
   * https://codex.wordpress.org/Function_Reference/register_post_type
   *
   * @return string
   */
  public static function getPostType()
  {
    return 'page';
  }

  public static function getSiblings($parentID)
  {
    global $post;

    // Add custom function
    QueryBuilder::macro('siblings', function ($id) {
      $this->params['post_parent'] = $id;
      return $this;
    });

    $pages = MyPage::builder()
      ->siblings($parentID)
      ->get();

    return $pages;
  }

  public static function getParentPage()
  {
    global $post;

    if ($post->post_parent) {

      $ancestors = get_post_ancestors($post->ID);
      $parent = end($ancestors);
    } else {

      $parent = $post->ID;
    }

    $parent_page = new MyPage($parent);

    // var_dump($parent_page);

    // return 'teste';
    return $parent_page;
    // return new Page($parent);
    // return static::getPostType();
    // return 'teste';
  }
}
