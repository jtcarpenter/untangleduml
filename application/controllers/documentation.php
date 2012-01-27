<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**
    * Documentation
    *
    * controller class
    * Manages access to documention and user help
    *
    * @author	Jason Carpenter
    */

class Documentation extends CI_Controller {

    public function  __construct() {
        parent::__construct();

        //development library, not for production
        $this->load->library('firephp');
    }

    /**
     * index
     *
     * Loads documentation view
     * @return <HTML>
     */
    public function index(){
        
        $this->load->view('documentation_view');
       
    }
}
