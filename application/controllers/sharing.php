<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**
     * Sharing
     *
     * Controller class
     * Manages sharing requests
     *
     * @author Jason Carpenter
     */

class Sharing extends CI_Controller {
    private $data;

    public function  __construct() {
        parent::__construct();
        $this->load->helper(array('form','url'));

        $this->load->model('sharing_model');

        //third party library auth plugin classes
	$this->load->library('tank_auth');
        $this->load->model('users');

        //development library, not for production
        $this->load->library('firephp');
    }

    /**
     * index
     *
     * Returns sharing view with lists of shared users and sharers
     * and search for adding sharing for another user
     * @return <HTML>
     */
    public function index(){
        if($this->tank_auth->is_logged_in()){
            $shared_users = $this->sharing_model->get_shared_users();
            $sharers = $this->sharing_model->get_sharers();

            $this->data['shared_users'] = array();
            $this->data['sharers'] = array();

            foreach($shared_users as $shared_user){
                $user = $this->users->get_user_by_id($shared_user->shared_id,true);
                $this->data['shared_users'][] = $user->username;
            }
            foreach($sharers as $sharer){
                $user = $this->users->get_user_by_id($sharer->sharer_id,true);
                $this->data['sharers'][] = $user->username;
            }

            $this->load->view('sharing_view',$this->data);
            
        }else{
            $this->load->view('unavailable_view');
        }
    }

    /**
     * user
     *
     * Responds to search input
     * @return <HTML>
     */
    public function user(){
        if($this->tank_auth->is_logged_in()){
            $result = $this->users->search_users();
            
            echo $result;
        }else{
            
            $this->load->view('unavailable_view');
        }
    }

    /**
     * share
     *
     * Responds to request to share with a specific user
     * @return <HTML>
     */
    public function share(){
        if($this->tank_auth->is_logged_in()){
            $username = $this->input->post('username');
            $user = $this->users->get_user_by_username($username);
            $user_id = $user->id;

            if($this->sharing_model->add_sharing($user_id)){
                echo '<p>shared</p>';
            }
        }else{
            
            $this->load->view('unavailable_view');
        }
    }

    /**
     * unshare
     *
     * Responds to request to revoke sharing with specific user
     * @return <HTML>
     */
    public function unshare(){
        
        if($this->tank_auth->is_logged_in()){
            $username = $this->input->post('username');
            $user = $this->users->get_user_by_username($username);
            $user_id = $user->id;

            if($this->sharing_model->remove_sharing($user_id)){
                echo '<p>removed</p>';
            }         
        }else{
            
            $this->load->view('unavailable_view');
        }
    }

    /**
     * reject
     *
     * Responds to request to reject shaing
     * @return <HTML>
     */
    public function reject(){
        
        if($this->tank_auth->is_logged_in()){
            $username = $this->input->post('username');
            $user = $this->users->get_user_by_username($username);
            $user_id = $user->id;

            if($this->sharing_model->reject_sharing($user_id)){
                echo 'rejected';
            }
        }else{
            
            $this->load->view('unavailable_view');
        }
    }
}
