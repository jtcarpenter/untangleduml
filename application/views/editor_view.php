<!DOCTYPE html>
<html lang="en">
<head>

        <base href="<?php echo site_url() ?>">

	<meta charset="utf-8">
	<title>UML Modeller</title>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/reset.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/editor.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/popup.css" media="screen, projection"/>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/print.css" media="print"/>

	<link href='http://fonts.googleapis.com/css?family=Comfortaa:700|Kranky|Buda:300|Pompiere|Cabin+Sketch:700' rel='stylesheet' type='text/css'>
                 
        <script type="text/javascript" src="<?php echo base_url();?>js/jquery-1.6.1.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/jquery-ui-1.8.14.custom.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/jquery.jsPlumb-1.3.2-all-min.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/spin.min.js"></script>

        <script type="text/javascript" src="<?php echo base_url();?>js/Dispatcher.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/Language.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/Painter.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/Reader.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/Writer.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/Assimilator.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/Highlighter.js"></script>
        <script type="text/javascript" src="<?php echo base_url();?>js/editor.js"></script>

        <title>Editor</title>
   
</head>
<body>
<div id="wrapper">
    <h1>Untangled UML</h1>    

    <nav>
        <ul>
            <?php if($logged_in):?>
            <li><a id="logout" href="<?php echo site_url('auth/logout');?>" >logout</a>
            <?php else:?>
            <li><a id="loadLogin" href="<?php echo site_url('auth/login');?>" >login</a>
            <?php endif?>
            <li><a id="account" href="<?php echo site_url('accounts');?>">account</a></li>
            <li id="username"><?php echo $username?></li>
        </ul>
    </nav>

    <div id="drawing_controls">
        <ul>
            
            <li><a title="new diagram" class="control" id="fresh" href="#"><span>new</span></a></li>
            <li><a title="load diagram" class="control" id="load" href="#"><span>load</span></a></li>
            <li><a title="save diagram" class="control" id="save" href="#"><span>save</span></a></li>
            <li><a title="print diagram" class="control"id="print" href="#" ><span>print</span></a></li>
            <li><a title="delete diagram" class="control"id="confirmDelete" href="#" ><span>delete</span></a></li>
            <li><a title="syntax documentation" class="control" id="docs" href="#" ><span>documentation</span></a></li>
            <li><a title="sharing options" class="control" id="sharing" href="#" ><span>sharing</span></a></li>
            <li><a title="biggest font size" class="control" href="#" id="fontHuge"><span>font size</span></a></li>
            <li><a title="big font size" class="control" href="#" id="fontBig"><span>font size</span></a></li>
            <li><a title="medium font size" class="control" href="#" id="fontMedium"><span>font size</span></a></li>
            <li><a title="small font size" class="control" href="#" id="fontSmall"><span>font size</span></a></li>
            <li>
                <label title="enable sharing on diagram" for="shared">shared</label>
                <input id = "shared" type="checkbox" value="shared" name="shared" />
            </li>

        </ul>
    </div>
        
    <div id="drawing_panel">
        
    </div>

    <div id="text_panel">
        <div id="text_controls">
            <span title="move text editor" id="handle"></span>
            <span title="toggle open close" id="toggle" class="down"></span>
            <span><a title="update diagram" class="control" href="#" id="update">update</a></span>            
            <span title="title of courrent diagram" id="title" contentEditable="true">untitled</span>
            <span title="unsaved" id="saved" class="saved">*</span>
            
        </div>
        <div id="padding"></div>
        <div contenteditable="true" id="text_editor"></div>
        
    </div>
</div>
    
    <!-- informs user that javascript is needed, removed on startup if javascript is available -->
    <div id="popup" class="visible">
        <div class="control" id="close">X</div>
        <div id="popup_contents">
            <p>untangled uml was unable to run.</p>
            <p> Please make sure you have Javascript enabled in your browser.</p>
        </div>
    </div>

    <div id="spinner"></div>

</body>
</html>