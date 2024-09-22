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
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets(){
        wp_register_script('posts-quiz', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type( 'posts-quiz/quiz', array(
            'editor_script' => 'posts-quiz',
            'render_callback' => array($this, 'renderHTML'),
        ));
    }

    function renderHTML($attributes) {
        ob_start(); ?>
        <h1> Quiz title '. $attributes['QuizTitle'] .'</h1><h> Quiz description 
        '. $attributes['QuizDescription'] . '</h>;  
        <?php return ob_get_clean();
    }
}

$PostsQuiz = new PostsQuiz();
