<h2><?php echo $whose;?> Diagrams</h2>
<div id="diagramsWrapper">
    <ul>
        <?php foreach($diagrams as $diagram):?>
        <li>
            <a href="#" id="<?php echo $diagram->diagram_id;?>"><?php echo $diagram->title;?></a>
        </li>
        <?php endforeach?>
    </ul>
</div>