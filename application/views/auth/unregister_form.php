<?php
$password = array(
	'name'	=> 'password',
	'id'	=> 'password',
	'size'	=> 30,
);
?>

<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/reset.css" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/popup.css" media="screen, projection"/>

<div id="popup" class="visible">
<div id="popup_contents">

<?php echo form_open($this->uri->uri_string()); ?>
<table>
	<tr>
		<td><?php echo form_label('Password', $password['id']); ?></td>
		<td><?php echo form_password($password); ?></td>
		<td style="color: red;"><?php echo form_error($password['name']); ?><?php echo isset($errors[$password['name']])?$errors[$password['name']]:''; ?></td>
	</tr>
</table>
<?php echo form_submit('cancel', 'Delete account'); ?>
<?php echo form_close(); ?>

<p id="app"><a href="<?php echo site_url('editor');?>">application</a></p>

</div>
</div>