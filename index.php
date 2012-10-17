<?php
	require_once("config.php");
    $monthArray = array(
        1=>'一月',
        2=>'二月',
        3=>'三月',
        4=>'四月',
        5=>'五月',
        6=>'六月',
        7=>'七月',
        8=>'八月',
        9=>'九月',
        10=>'十月',
        11=>'十一月',
        12=>'十二月'
    );
    $vars = array();
    $defaultDate = date('Y-n-d');
    $dd = isset($_GET['date'])?$_GET['date']:$defaultDate;
    $dateArray = split('-',$dd);
    $year = $dateArray[0];
    $month = $dateArray[1];
    $pregstr = '/[\x{4e00}-\x{9fa5}]/u';
    $monthName = $monthArray[$month];
    if(preg_match_all($pregstr, $monthName, $matchArray)){
        $vars['monthNameArray'] = $matchArray[0];
    }
    $dba = dba();
    $notes = $dba->select('select * from note where n_year='.$year.' and n_month='.$month);
    $n = array();
    foreach($notes as $note){
        $n[$note['n_day']] = $note['n_content'];
    }
    $vars['note'] = $n;
    $vars['monthDayCount'] = date('t',  mktime(0,0,0,$month,1,$year));
    $vars['is_current_month'] = date('Y-n')===$year.'-'.$month;
    $vars['year'] = $year;
    $vars['month'] = $month;
    $vars['day'] = date('j');
    view($vars);
?>