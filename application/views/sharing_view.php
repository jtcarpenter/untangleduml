    <?php
    $form_attr = array('class'=>'shareSearch','id'=>'shareSearch');
    $input_attr = array('name'=>'search','id'=>'search','value'=>'username','maxlength'=>'100','size'=>'50','style'=>'width:50%',);
    $submit_attr = array('name'=>'search','id'=>'searchBtn','class'=>'disabled','value'=>'share');
    ?>


    <div id="sharingSearch">
        <?php echo form_open('', $form_attr);?>
        <?php echo form_input($input_attr);?>
        <?php echo form_submit($submit_attr);?>
        <?php echo form_close();?>
    </div>

<div id="sharingWrapper">
    <table id="sharingTable">
        <tr>
            <th>I've shared with</th>
            <th>shared with me</th>
        </tr>

        <?php $longest = max($shared_users,$sharers);?>
        <?php for($i=0;$i<count($longest);$i++):?>

        <tr>
            <td id="<?php if(isset($shared_users[$i]))echo $shared_users[$i];?>"><?php if(isset($shared_users[$i]))echo $shared_users[$i];?>
                <a class="unshare" href="#"><?php if(isset($shared_users[$i]))echo 'delete';?></a>
            </td>
            <td id="<?php if(isset($sharers[$i]))echo $sharers[$i];?>">
                <a class="sharer" href="#"><?php if(isset($sharers[$i]))echo $sharers[$i];?></a>
                <a class="reject" href="#"><?php if(isset($sharers[$i]))echo 'reject'?></a>
            </td>
        </tr>

        <?php endfor?>
        
    </table>

</div>
