<?php

namespace App\PostTypes;

use Timber;
use TimberPost;
use WP_Query;

use Rareloop\Lumberjack\Post;

class Press extends Post
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
        return 'press';
    }

    /**
     * Return the config to use to register the post type with WordPress
     * Second parameter of the `register_post_type` function:
     * https://codex.wordpress.org/Function_Reference/register_post_type
     *
     * @return array|null
     */
    protected static function getPostTypeConfig()
    {
        return [
            'labels' => [
                'name' => __('Press Releases'),
                'singular_name' => __('Press Release'),
                'add_new_item' => __('Add New Press Release'),
            ],
            'public' => true,
            'show_in_rest' => true,
            'has_archive' => false
        ];
    }
}
