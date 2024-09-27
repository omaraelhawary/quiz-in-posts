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
        register_block_type( __DIR__, array(
            'render_callback' => array($this, 'renderHTML'),
        ));
    }

    function renderHTML($attributes) {
        if(!is_admin()){
            wp_enqueue_script('posts-quiz-frontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
        }       

        ob_start(); ?>
            <div class="posts-quiz-frontend-update">
                <pre style="display: none"><?php echo wp_json_encode($attributes) ?></pre>
            </div>
        <?php return ob_get_clean();
    }
}

$PostsQuiz = new PostsQuiz();
