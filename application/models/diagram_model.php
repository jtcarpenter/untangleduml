<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
    /**
     * Diagram_model
     *
     * Model Class
     * Represents diagram data. Operates on diagram table
     * Manages diagrams stored in external txt files
     *
     * @author Jason Carpenter
     */

class Diagram_model extends CI_Model{
    private $file_path;

    function __construct(){
        parent::__construct();
        $this->load->database();
        $this->load->helper('file');
        $this->file_path = 'graphs/';

        //third party auth library
	$this->load->library('tank_auth');
        
        //development library, not for production
        $this->load->library('firephp');
    }

    /**
     * insert_diagram
     *
     * Inserts a diagram into diagram table
     * @param   <int>     $user_id
     * @param   <String>  $title
     * @param   <int>     $version
     * @param   <Boolean> $shared
     * @return  <int>
     */
    function insert_diagram($user_id,$title,$version,$shared){
        
        $sql = "
            INSERT INTO diagram
            (user_id,title,version,shared)
            VALUES
            (?,?,?,?)
            ";
        $query = $this->db->query($sql,array($user_id,$title,$version,$shared));
        $id = $this->db->insert_id();
        return $id;
    }

    /** update_diagram
     *
     * updates diagram in diagram table
     * @param   <int>     $diagram_id
     * @param   <int>     $user_id
     * @param   <String>  $title
     * @param   <int>     $version
     * @param   <Boolean> $shared
     * @return  <Boolean> $query
     */
    function update_diagram($diagram_id,$user_id,$title,$version,$shared){
        $sql = "
            UPDATE diagram
            SET user_id = ?,title = ?,version = ?,shared = ?
            WHERE diagram_id = ?
            ";
        $query = $this->db->query($sql,array($user_id,$title,$version,$shared,$diagram_id));

        return $query;
    }

    /**
     * write_diagram
     *
     * writes a diagram json string to an external file
     * @param <int>     $diagram_id
     * @param <String>  $diagram_str
     */
    function write_diagram($diagram_id,$diagram_str){
        $path = $this->file_path.$diagram_id.'.txt';
        
        write_file($path, $diagram_str);
    }

    /**
     * diagram_exists
     *
     * returns user id if a diagram exists in diagram table
     * @param   <int> $diagram_id
     * @return  <int>
     */
    function diagram_exists($diagram_id){
        $sql = "
            SELECT user_id
            FROM diagram
            WHERE diagram_id = ?
            ";
        $query = $this->db->query($sql,array($diagram_id));
        $result = $query->result();
        if(empty($result)){
            return false;
        }else{
            $arr = array();
            $arr = $query->result();
            $id = $arr[0]->user_id;

            return $id;
        }
    }

    /**
     * save_diagram
     *
     * saves given graph. if the graph is new or
     * does not belong to current user will perform insert,
     * otherwise update
     * @param   <Object> $graph
     * @return  <int>    $diagram_id
     */
    function save_diagram($graph){
        
        $user_id = $this->tank_auth->get_user_id();
        $title = $graph->title;
        $version = ($graph->version++) % 1000;
        $shared = $graph->shared;
        $diagram_id = $graph->id;
        $diagram_user_id = $this->diagram_exists($diagram_id);

        //this ensures that followers don't save over top of original
        if($diagram_user_id==false || $diagram_user_id!=$user_id){
            $diagram_id = $this->insert_diagram($user_id,$title,$version,$shared);
            $graph->id = $diagram_id;
            $diagram_str = json_encode($graph);
            $this->write_diagram($diagram_id,$diagram_str);
            
        }else{
            $diagram_str = json_encode($graph);
            $this->update_diagram($diagram_id,$user_id,$title,$version,$shared);
            $this->write_diagram($diagram_id,$diagram_str);

        }
        return $diagram_id;
    }

    /**
     * get_user_diagrams
     *
     * returns list of all diagrams belonging to current user
     * @return <Object>
     */
    function get_user_diagrams(){
        $user_id = $this->tank_auth->get_user_id();

        $sql = "
            SELECT diagram_id,title,version,shared
            FROM diagram
            WHERE user_id = ?
            ";
        $query = $this->db->query($sql,array($user_id));      

        return $query->result();;
    }

    /**
     * get_diagram_str
     *
     * reads a diagram json string from external file
     * sets id to null is user is not owner
     * to protect diagram
     * @param   <int>  $diagram_id
     * @return  <JSON> $diagram
     */
    function get_diagram_str($diagram_id){
        $user_id = $this->tank_auth->get_user_id();
        $path = $this->file_path.$diagram_id.'.txt';
        $diagram = read_file($path);

        if($this->diagram_exists($diagram_id)!=$user_id){
            //user is not owner, set diagram id to null
            $decoded = json_decode($diagram);

            $decoded->{'id'} = null;
            $diagram = json_encode($decoded);
        }
        
        return $diagram;
    }

    /**
     * get_diagram
     * 
     * @param   <int> $diagram_id
     * @return  <Object>
     */
    function get_diagram($diagram_id){
        $json = $this->get_diagram_str($diagram_id);
        $diagram = json_decode($json);
        return $diagram;
    }

    /**
     * get_shared_diagrams
     *
     * returns list of all diagrams of status shared
     * @param   <int>   $sharer
     * @return  <Object> 
     */
    function get_shared_diagrams($sharer){
        
        $sql = "
            SELECT diagram_id,user_id,title,version,shared
            FROM diagram
            WHERE shared = ? AND user_id = ?
            ";
        $query = $this->db->query($sql,array(true,$sharer));
        
        return $query->result();
    }

    /**
     * delete_diagram
     *
     * removes diagram entry from diagram table
     * removes diagram external txt file
     * fails and returns false if
     * ownder of diagram is not logged in user
     * @param   <int>       $diagram_id
     * @return  <Boolean>
     */
    function delete_diagram($diagram_id){
        $user_id = $this->tank_auth->get_user_id();

        $sql = "
            DELETE FROM diagram
            WHERE
            user_id = ? AND diagram_id = ?
            ";
        if($query = $this->db->query($sql,array($user_id,$diagram_id))){
            unlink($this->file_path.$diagram_id.'.txt');
        }

        return $query;
    }
}

?>