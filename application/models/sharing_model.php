<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
    /**
     * Sharing_model
     *
     * Model class
     * Represents sharing relationships between users
     *
     * @author Jason Carpenter
     */

class Sharing_model extends CI_Model{
    private $file_path;

    function __construct(){
        parent::__construct();
        $this->load->database();

        //third party auth library
	$this->load->library('tank_auth');

        //development library, not for production
        $this->load->library('firephp');
    }

    /**
     * add_sharing
     *
     * update sharing table to include new instance of sharing
     * @param   <int>       $shared_id
     * @return  <Boolean>   $query
     */
    function add_sharing($shared_id){
        $sharer_id = $this->tank_auth->get_user_id();
        
        $sql = "
            INSERT INTO sharing
            (sharer_id,shared_id)
            VALUES
            (?,?)
            ";
        $query = $this->db->query($sql,array($sharer_id,$shared_id));

        return $query;
    }

    /**
     * remove_sharing
     *
     * @param   <int>       $shared_id
     * @return  <Boolean>   $query
     */
    function remove_sharing($shared_id){
        $sharer_id = $this->tank_auth->get_user_id();

        $sql = "
            DELETE FROM sharing
            WHERE
            sharer_id = ? AND shared_id = ?
            ";
        $query = $this->db->query($sql,array($sharer_id,$shared_id));

        return $query;
    }

    /**
     * reject_sharing
     * 
     * @param   <int>       $sharer_id
     * @return  <Boolean>   $query
     */
    function reject_sharing($sharer_id){
        $shared_id = $this->tank_auth->get_user_id();

        $sql = "
            DELETE FROM sharing
            WHERE
            sharer_id = ? AND shared_id = ?
            ";
        $query = $this->db->query($sql,array($sharer_id,$shared_id));

        return $query;
    }

    /**
     * get_shared_users
     *
     * returns list of all users current user is sharing with
     * @return <Object> 
     */
    function get_shared_users(){
        $sharer_id = $this->tank_auth->get_user_id();

        $sql = "
            SELECT shared_id
            FROM sharing
            WHERE
            sharer_id = ?
            ";
        $query = $this->db->query($sql,array($sharer_id));

        return $query->result();
    }

    /**
     * get_sharers
     *
     * reuurns all users sharing with current user
     * @return <Object>
     */
    function get_sharers(){
        $shared_id = $this->tank_auth->get_user_id();

        $sql = "
            SELECT sharer_id
            FROM sharing
            WHERE
            shared_id = ?
            ";
        $query = $this->db->query($sql,array($shared_id));

        return $query->result();
    }
}

?>