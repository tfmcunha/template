<?php

namespace App\PostTypes;

use Timber;
use TimberPost;
use WP_Query;

use Rareloop\Lumberjack\Post;

class News extends Post
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
        return 'news';
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
                'name' => __('In The News'),
                'singular_name' => __('Article'),
                'add_new_item' => __('Add New Article'),
            ],
            'public' => true,
            'show_in_rest' => true,
            'has_archive' => true
        ];
    }
}