<?php

/*
    Plugin Name:    Posts Quiz
    Description:    Add a quiz to your posts
    Author:         Omar ElHawary
    Author URI:     https://github.com/omaraelhawary
    Version:        1.0.0
*/

if (! defined('ABSPATH')) exit; // Exit if accessed directly

class PostsQuiz{
    function __construct() {
        add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
    }

    function adminAssets(){
        wp_enqueue_script('posts-quiz', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    }
}

$PostsQuiz = new PostsQuiz();
