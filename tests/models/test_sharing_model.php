<?php
class test_sharing_model extends CodeIgniterUnitTestCase{
    /**
    * test_sharing_model
    *
    * This test runs unit tests against sharing_model
    * Tests run against the real application database
    * Re-initialises database to a consistent state
    *
    * @author	Jason Carpenter
    */
    
    private $mock_diagram;
    private $observer;
    private $decoded_observer;
    private $file_path;
    private $untangled;
    private $updated_untangled;
    private $decoded_untangled;
    private $updated_decoded_untangled;
    private $user_id;
    private $untangled_path;
    private $mock_untangled;

    private $shared_id;
    private $sharer_id;

    public function __construct(){
        parent::__construct();

        $this->UnitTestCase('Sharing Model');
        $this->_ci->load->model('diagram_model');
        $this->_ci->load->model('users');
        $this->_ci->load->helper('file');
        $this->file_path = 'graphs/';

        $this->_ci->load->library('form_validation');
	$this->_ci->load->library('tank_auth');
        $this->_ci->load->library('security');
	$this->_ci->lang->load('tank_auth');

        $this->user_id = $this->_ci->tank_auth->get_user_id();

        $this->_ci->load->model('sharing_model');
        $this->shared_id = 2;
        $this->sharer_id = 2;
    }

    /**
     * setUp
     *
     * Runs before every test
     * Truncate and re-populate Users table
     * Leaves table in consistent state
     */
    public function setUp(){
        error_reporting(0);

        $this->_ci->db->truncate('users');
        $this->_ci->tank_auth->create_user('tester','untangleduml@gmail.com','tester',false);
        $this->_ci->tank_auth->create_user('jason','jtcarpenter@gmail.com','jason',false);
        $this->_ci->tank_auth->create_user('marta','jasoncarpenter99@hotmail.com','marta',false);
        $this->_ci->tank_auth->login('tester','tester',true,true,true);

        $this->_ci->db->truncate('sharing');
        $insert = $this->_ci->sharing_model->add_sharing(2);
    }

    /**
     * tearDown
     *
     * Runs after every test
     */
    public function tearDown(){
        $this->_ci->db->truncate('sharing');
        $insert = $this->_ci->sharing_model->add_sharing(2);
    }

    public function test_get_user_by_username(){
        $username = 'jason';
        $user = $this->_ci->users->get_user_by_username($username);

        $this->assertIdentical($user->id,'2','returned the expected user, id is a string');
    }

    public function test_add_sharing(){
        $this->_ci->db->truncate('sharing');
        $insert = $this->_ci->sharing_model->add_sharing($this->shared_id);

        $this->assertTrue($insert,'inserted sharing returned '.$insert);
    }

    public function test_remove_sharing(){
        $remove = $this->_ci->sharing_model->remove_sharing($this->shared_id);

        $this->assertTrue($remove,'removed sharing, returned '.$remove);
    }

    public function test_reject_sharing(){
        $remove = $this->_ci->sharing_model->reject_sharing($this->sharer_id);

        $this->assertTrue($remove,'rejected sharing, returned '.$remove);
    }

    public function test_get_shared_users(){
        $shared_users = $this->_ci->sharing_model->get_shared_users();
        
        $this->assertIdentical($shared_users[0]->shared_id,'2','returned expected shared user, returned id as string');
    }

    public function test_get_sharers(){
        $sharers = $this->_ci->sharing_model->get_sharers();
        
        $this->assertEqual(sizeOf($sharers),0,'returned expected sharers, returned id as string');
    }

    public function test_search_users(){
        $search1 = 'ja';//should return jason, tester is logged in
        $search2 = 'ta';//should return marta
        $search3 = 'a';//conflict tester is logged in, could be jason or marta
        $search4 = 'b';//should return nothing

        $result1 = $this->_ci->users->search_users($search1);
        $result2 = $this->_ci->users->search_users($search2);
        $result3 = $this->_ci->users->search_users($search3);
        $result4 = $this->_ci->users->search_users($search4);
        
        $this->assertEqual($result1,'jason','found expected username '.$result1);
        $this->assertEqual($result2,'marta','found expected username '.$result2);
        $this->assertEqual($result3,false,'found expected username '.$result3);
        $this->assertEqual($result4,false,'found expected username '.$result4);
    }
}