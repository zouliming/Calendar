<?php

require_once("config.php");

$dba = dba();
$year = date('Y');
$notes = $dba->select('select * from note where n_year=' . $year);
$n = array();
foreach ($notes as $note) {
        $k = $note['n_year'].'_'.$note['n_month'].'_'.$note['n_day'];
        $n[$k] = $note['n_content'];
}
$vars['note'] = $n;
view($vars);
?>