<?php

namespace App\Http;

use App\Forecast;
use App\Menu\Menu;
use Timber\PostQuery;
use Twig\TwigFunction;
use Rareloop\Lumberjack\Http\Lumberjack as LumberjackCore;

class Lumberjack extends LumberjackCore
{
  public function addToContext($context)
  {
    $context['is_home'] = is_home();
    $context['is_front_page'] = is_front_page();
    $context['is_logged_in'] = is_user_logged_in();
    $context['barba_loaded'] = isset($_SERVER['HTTP_X_BARBA']);

    // In Timber, you can use TimberMenu() to make a standard Wordpress menu available to the
    // Twig template as an object you can loop through. And once the menu becomes available to
    // the context, you can get items from it in a way that is a little smoother and more
    // versatile than Wordpress's wp_nav_menu. (You need never again rely on a
    // crazy "Walker Function!")


    // MENUS  -------------------------------------------------------------
    $context['nav']['main'] = new Menu('main-nav');
    $context['nav']['footer'] = new Menu('footer-nav');
    $context['nav']['social'] = new Menu('social-nav');

    // WIDGETS  ---------------------------------------------------------------
    // $context['sidebar']['lodging_filters'] = Timber::get_widgets('lodging_filters');

    // FUNCTION WRAPPERS ------------------------------------------------------

    return $context;
  }

  public function addToTwig($twig)
  {
    $twig->addFunction(new TwigFunction('get_custom_archive', function ($type) {
      $args = array('post_type' => $type, 'posts_per_page' => -1);
      return new PostQuery($args);
      // echo $type;
    }));

    $twig->addFunction(new TwigFunction('global_post', function () {
      global $post;
      return new \Timber\Post($post);
    }));

    return $twig;
  }
}
