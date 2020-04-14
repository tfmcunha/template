<?php

namespace App\Providers;

use \Jigsaw;
use \Timber;
use Rareloop\Lumberjack\Providers\ServiceProvider;

class JigsawServiceProvider extends ServiceProvider
{
  /**
   * Register any app specific items into the container
   */
  public function register()
  { }

  /**
   * Perform any additional boot required for this application
   */
  public function boot()
  {
    add_action('init', array($this, 'setup_admin_ui'));

    add_action('login_enqueue_scripts', array($this, 'login_logo'));
    add_action('login_enqueue_scripts', array($this, 'login_styles'));

    /**
     * Makes the login screen's logo link to your homepage, instead of to WordPress.org.
     * @since 2.0.0
     */
    add_filter('init', function () {
      return home_url();
    });
    /**
     * Makes the login screen's logo title attribute your site title, instead of 'WordPress'.
     * @since 2.0.0
     */
    add_filter('login_headertitle', function () {
      return get_bloginfo('name');
    });
  }

  function login_logo()
  {
    ?><style type="text/css">
      body.login h1 a {
        background-image: url(<?php echo get_template_directory_uri() ?>/build/img/Logo.svg);

        /* Adjust to the dimensions of your logo. WP Default: 80px 80px */
        background-size: 214px 97px;
        width: 214px;
        height: 97px;
      }
    </style>
  <?php
    }

    function login_styles()
    {
      ?>
    <style type="text/css">
      body,
      html body {
        background-color: hsla(206, 61%, 89%, 1.000);
      }

      body.login form {
        background: #fff;
      }
    </style>
<?php
  }

  function setup_admin_ui()
  {
    if (class_exists('Jigsaw')) {
      Jigsaw::add_css('build/styles/admin.css');

      // Adiciona imagem de preview
      Jigsaw::add_column(array('winter-activity', 'summer-activity', 'post', 'page', 'dining', 'sundance-venue', 'lodging', 'special'), 'Image', function ($pid) {
        $data = array();
        $data['post_id'] = $pid;
        $data['thumbnail'] = get_the_post_thumbnail($pid, [44, 44]);
        Timber::render('admin/post-thumb.twig', $data);
      }, 1);
    }
  }
}
