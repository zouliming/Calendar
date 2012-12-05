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
    $xingqiArray = array(
        0=>'星期天',
        1=>'星期一',
        2=>'星期二',
        3=>'星期三',
        4=>'星期四',
        5=>'星期五',
        6=>'星期六',
    );
    $vars = array();
    $defaultDate = date('Y-n');
    $dd = isset($_GET['date'])?$_GET['date']:$defaultDate;
    $dateArray = split('-',$dd);
    $year = $dateArray[0];
    $month = $dateArray[1];
    $month = ltrim($month, '0');
    $monthFirstDay = date('w',  mktime(0, 0, 0, $month, 1, $year));//这个月的第一天的星期数
    $pregstr = '/[\x{4e00}-\x{9fa5}]/u';
    $monthName = $monthArray[$month];
    if(preg_match_all($pregstr, $monthName, $matchArray)){
        $vars['monthNameArray'] = $matchArray[0];
    }
    $dba = dba();
    $notes = $dba->select('select * from note where n_year='.$year.' and n_month='.$month);
    $n = array();
    $xingqi = $monthFirstDay;
    foreach($notes as $note){
        $xingqi = $xingqi++%6==0?$xingqi:0;
        $n[$note['n_day']] = array(
            'note'=>$note['n_content'],
            'xingqi'=>$xingqiArray[$xingqi]
        );
    }
    $vars['note'] = $n;
    $vars['monthDayCount'] = date('t',  mktime(0,0,0,$month,1,$year));
    $vars['is_current_month'] = date('Y-n')===$year.'-'.$month;
    $vars['year'] = $year;
    $vars['month'] = $month;
    $vars['day'] = date('j');
    //计算上个月的末尾在这个月占有的天数
    $lastMonthDayCount = date('t',  mktime(0,0,0,$month-1,1,$year));
    $lastMonthDays = array();
    for($i=($lastMonthDayCount-$monthFirstDay+1);$i<=$lastMonthDayCount;$i++){
        array_push($lastMonthDays,$i);
    }
    $vars['lastMonthDays'] = $lastMonthDays;
    $vars['xingqiArray'] = $xingqiArray;
    $vars['monthFirstDay'] = $monthFirstDay;
    view($vars);
?>