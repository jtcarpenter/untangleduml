<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**
    * Accounts
    *
    * controller class
    * Manages access to account functions
    *
    * @author	Jason Carpenter
    */

class Accounts extends CI_Controller {
    private $data;

    public function  __construct() {
        parent::__construct();
        $this->load->helper('url');

        //third party auth plugin
	$this->load->library('tank_auth');

        //development library, not for production
        $this->load->library('firephp');
    }

    /**
     * index
     *
     * loads accounts view, with links to account functions
     * @return <HTML>
     */
    public function index(){
        if($this->tank_auth->is_logged_in()){
            
            $this->load->view('account_view');
            
        }else{
            
            $this->load->view('unavailable_view');
        }
    }
}
