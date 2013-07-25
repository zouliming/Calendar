<?php
require_once("config.php");
$dba = dba();
$date = $_POST['date'];
if($date){
        $dateArr = explode("-", $date);
        $rows = $dba->execute('DELETE FROM `note` WHERE `n_year`=? AND `n_month`=? AND `n_day`=?',$dateArr[0],$dateArr[1],$dateArr[2]);
        if($rows>0){
                echo 1;
        }else{
                echo 0;
        }
}else{
        echo 0;
}
?>
