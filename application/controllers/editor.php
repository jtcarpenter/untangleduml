<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**
     * Editor
     *
     * Controller class
     * Main application controller, loads the main application page
     * Manages access to diagram functions
     *
     * @author Jason Carpenter
     */

class Editor extends CI_Controller {
    private $data;

    public function  __construct() {
        parent::__construct();
        $this->load->helper('url');

        $this->load->model('diagram_model');

        //third party auth plugin classes
	$this->load->library('tank_auth');
        $this->load->model('users');
        
        //development library, not for production
        $this->load->library('firephp');
    }

    /**
     * index
     *
     * Loads the main application view
     * @return <HTML>
     */
    public function index(){
        $this->data['username']=$this->tank_auth->get_username();

        if($this->tank_auth->is_logged_in()){
            $this->data['logged_in']=true;
            
        }else{
            $this->data['logged_in']=false;
        }
            
        $this->load->view('editor_view',$this->data);
    }

    /**
     * save
     *
     * Responds to client save request
     * @return <JSON>
     */
    public function save(){
        if($this->tank_auth->is_logged_in()){
            $graph = json_decode($this->input->post('graph'));                   
            
            $diagram_id = $this->diagram_model->save_diagram($graph);

            $output = '{"message":"saved","diagramId":'.$diagram_id.'}';

            echo $output;
        }else{
            $view = array();
            $view['message'] = $this->load->view('unavailable_view','',true);
            $output = json_encode($view);
            echo $output;
        }
    }

    /**
     * diagrams
     *
     * Returns list of diagrams belonging to current user
     * @return <HTML>
     */
    public function diagrams(){
        if($this->tank_auth->is_logged_in()){      

            $user_diagrams = $this->diagram_model->get_user_diagrams();

            $this->data['whose']='My';
            $this->data['diagrams']=$user_diagrams;
            $this->load->view('diagrams_view',$this->data);
        }else{
            
            $this->load->view('unavailable_view');
        }
    }

    /**
     * shared_diagrams
     *
     * Returns list of shared disgrams of a specific user
     * @return <HTML>
     */
    public function shared_diagrams(){
        
        if($this->tank_auth->is_logged_in()){
            
            $username = $this->input->post('username');
            
            $sharer = $this->users->get_user_by_username($username);
            $sharer_id = $sharer->id;

            $shared_diagrams = $this->diagram_model->get_shared_diagrams($sharer_id);

            $this->data['whose']='Shared';
            $this->data['diagrams']=$shared_diagrams;
            $this->load->view('diagrams_view',$this->data);
        }else{
            
            $this->load->view('unavailable_view');
        }
    }

    /**
     * load
     *
     * Loads a diagram of given id
     * @param   <String>    $diagam_id
     * @return  <JSON>      
     */
    public function load($diagram_id){
        if($this->tank_auth->is_logged_in()){
            $graph = $this->diagram_model->get_diagram_str($diagram_id);

            echo $graph;
        }
    }

    /**
     * delete
     *
     * Deletes diagram of given id
     * @return  <HTML>      
     */
    public function delete(){
        $diagram_id=$this->input->post('diagramId');
        
        if($this->tank_auth->is_logged_in()){
            $this->diagram_model->delete_diagram($diagram_id);

            echo '<p>deleted diagram</p>';
        }else{
            
            $this->load->view('unavailable_view');
        }
    }
}
