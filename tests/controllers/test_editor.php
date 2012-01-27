<?php
class test_editor extends CodeIgniterWebTestCase{
    /**
    * test_editor
    *
    * This test runs unit tests against the editor controller
    * Tests synchronous HTTP requests and auth functions
    *
    * @author Jason Carpenter
    */

    public function __construct(){
        parent::__construct();

        $this->WebTestCase('Editor Controller');
        $this->_ci =& get_instance();
        $this->_ci->load->helper('url');

        $this->_ci->load->library('form_validation');
	$this->_ci->load->library('tank_auth');
        $this->_ci->load->library('security');
        $this->_ci->lang->load('tank_auth');
        
        $this->url = site_url("editor");
    }

    /**
     * setUp
     *
     * Runs before every test
     * Simulates a login
     */
    public function setUp(){
        error_reporting(0);
        
        $this->get($this->url);
        $this->click('login');
        $this->setField('login', 'tester');
        $this->setField('password', 'tester');
        $this->setField('remember','checked');
        $this->click('Let me in');
    }

    /**
     * tearDown
     *
     * Runs after every test
     * Simulates logout
     */
    public function tearDown(){
        $this->click('Logout');
    }

    public function test_main(){
        $this->get($this->url);
        $this->assertTitle('Editor','root url points to main application page');
    }

    public function test_login(){
        $this->click('logout');
        $this->click('login');

        $this->assertField('submit','Let me in','login page is loaded');

        $this->setField('login', 'tester');
        $this->setField('password', 'tester');
        $this->setField('remember','checked');
        $this->click('Let me in');        

        $this->assertTitle('Editor','returned to main application page');
    }

    public function test_forgotten(){
        $this->click('logout');
        $this->click('login');
        $this->click('Forgot password');

        $this->assertField('reset','Get a new password','forgotten password page is loaded');
    }

    public function test_register(){
        $this->click('logout');
        $this->click('login');
        $this->click('Register');

        $this->assertField('register','Register','register page is loaded');
    }

    public function test_account(){
        $this->click('account');
        
        $this->assertLink('change password');
        $this->assertLink('change email');
        $this->assertLink('unregister');
    }

    public function test_new_password(){
        $this->click('account');
        $this->click('change password');

        $this->assertField('change','Change Password','change password page loaded');
    }

    public function test_new_email(){
        $this->click('account');
        $this->click('change email');

        $this->assertField('change','Send confirmation email','change email page loaded');
    }

    public function test_unregister(){
        $this->click('account');
        $this->click('unregister');

        $this->assertField('cancel','Delete account','unregister page loaded');
    }
}