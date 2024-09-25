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
        wp_register_style('quiz-edit-css', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('posts-quiz', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type( 'posts-quiz/quiz', array(
            'editor_script' => 'posts-quiz',
            'editor_style' => 'quiz-edit-css',
            'render_callback' => array($this, 'renderHTML'),
        ));
    }

    function renderHTML($attributes) {
        if(!is_admin()){
            wp_enqueue_script('posts-quiz-frontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-blocks', 'wp-element', 'wp-editor'));
            wp_enqueue_style('posts-quiz-frontend-css', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }
        

        ob_start(); ?>
            <div class="posts-quiz-frontend"> </div>
        <?php return ob_get_clean();
    }
}

$PostsQuiz = new PostsQuiz();
