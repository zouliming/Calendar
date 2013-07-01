<?php

require_once("config.php");

$dba = dba();
$year = date('Y');
$notes = $dba->select('select * from note where n_year=' . $year);
$n = array();
foreach ($notes as $note) {
        $k = date('Y-m-d',  mktime(0,0,0,$note['n_month'],$note['n_day'],$note['n_year']));
        $n[$k] = $note['n_content'];
}
$vars['note'] = $n;
view($vars);
?>