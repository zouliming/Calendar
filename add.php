<?php

require_once("config.php");
$dba = dba();
$note = $_POST['note'];
$year = $_POST['year'];
$month = $_POST['month'];
$day = $_POST['day'];
$dateNoteCount = $dba->select_one("select count(*) from `note` where n_year=? and n_month=? and n_day=?", $year, $month, $day);
if ($dateNoteCount > 0) {
        $rows = $dba->execute("UPDATE `note` SET n_content=? WHERE n_year=? AND n_month=? AND n_day=?", $note, $year, $month, $day);
        if ($rows > 0) {
                echo 1;
        } else {
                echo 0;
        }
} else {
        $userId = 1;
        $rows = $dba->execute("INSERT INTO `note` VALUES ( " . $dba->id('note') . ",'" . $note . "'," . time() . "," . $userId . "," . $year . "," . $month . "," . $day . ",1)");
        if ($rows > 0) {
                echo 1;
        } else {
                echo 0;
        }
}
?>