<?php
class test_rinse extends CodeIgniterUnitTestCase{
    /**
    * test_diagram_model
    *
    * This test removes all user data from the server
    *
    * @author	Jason Carpenter
    */

    public function __construct(){
        parent::__construct();

        $this->_ci->load->helper('file');
        $this->file_path = 'graphs/';
        error_reporting(0);
    }

    public function test_cleanup(){
        delete_files($this->file_path);
        $this->_ci->db->truncate('diagram');
        $this->_ci->db->truncate('users');
        $this->_ci->db->truncate('sharing');
        $this->_ci->db->truncate('ci_sessions');
        $this->_ci->db->truncate('login_attempts');
        $this->_ci->db->truncate('user_autologin');
        $this->_ci->db->truncate('user_profiles');

        echo 'Data deleted';
    }
}