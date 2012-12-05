<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            日历笔记--精彩只为你而留
        </title>
        <!-- Simple CSS file for HTML page -->
        <link rel="stylesheet" href="css/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <!-- jCalendar CSS - Contains Tipsy CSS - Delete as needed -->
        <link rel="stylesheet" href="css/rili.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="css/bootstrap.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="css/bootstrap-responsive.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <script src="js/jquery-1.8.2.min.js" type="text/javascript"></script>
        <script src="js/tipsy.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/bootstrap-modal.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/bootstrap-transition.js" type="text/javascript" charset="utf-8"></script>
        <script>
            var year = <?=$year?>;
            var month = <?=$month?>;
            var editEle = false;
            $(document).ready(function() {
                $('.day').tipsy({gravity: 's'});
                $('.next').bind('click',function(){
                    if(++month>12){
                        month=1;
                        year++;
                    }
                    window.location.href='?date='+year+'-'+month;
                });
                $('.prev').bind('click',function(){
                    if(--month<0){
                        month = 12;
                        year--;
                    }
                    window.location.href='?date='+year+'-'+month;
                });
                $('.day').bind('dblclick',function(){
                    editEle = $(this);
                    var d = $(this).attr('data-date').split('/');
                    $('#newNote').html($(this).attr('original-title'));
                    var year = d[0],month = d[1],day = d[2];
                    $('#newDate').html(year+'-'+month+'-'+day);
                    $('#myModal').modal({
                        backdrop:true,
                        keyboard:true,
                        show:true
                    });
                });
                $('#addNote').bind('click',function(){
                    var note = $('#newNote').val();
                    var d = $('#newDate').html().split("-");
                    month = d[1];
                    year = d[0];
                    day = d[2];
                    $.ajax({
                        type: "POST",
                        url: "add.php",
                        data: {year:year,month:month,day:day,note:note},
                        dataType:"json",
                        success: function(data){
                            if(data.status==1){
                                editEle.attr('original-title',note);
                            }else{
                               return false; 
                            }
                        }
                    });
                    window.location.reload();
                });
            });
        </script>
    </head>

    <body>
        <div id="header">
            日历笔记 - 此贡献来自于
            <a href="http://weibo.com/julyshine">
                邹立明
            </a>
            .
        </div>
        <div id="main-container">
            <div id="calendar">
                <?
                for($i=0;$i<strlen($year);$i++){
                    echo '<div class="year">'.$year[$i].'</div>';
                }
                ?>
                <div id="arrows">
                    <div class="next"></div>
                    <div class="prev"></div>
                </div>
                <div class="clear">
                </div>
                <?
                foreach($monthNameArray as $c){
                    echo '<div class="label bold" original-title="" style="display: block; ">'.$c.'</div>';
                }
                ?>
                <div class="clear"></div>
                <?
                foreach($lastMonthDays as $d){
                    echo '<div class="label blank" style="display: block; ">'.$d.'</div>';
                }
                $xingqiNum = $monthFirstDay;
                for($i=1;$i<$monthDayCount+1;$i++){
                    $n = isset($note[$i])?$note[$i]['note']:'';
                    $xingqiNum = $xingqiNum>6?0:$xingqiNum;
                    $xingqi = $xingqiArray[$xingqiNum++];
                    $g = 'n';
                    if($i%14==0){
                        $g = 'e';
                    }elseif($i%14==1){
                        $g = 'w';
                    }else{
                        $g = 's';
                    }
                ?>
                <div gravity="<?=$g?>" data-date="<?=$year.'/'.$month.'/'.$i?>" class="label day <?=empty($n)?'':'noted'?> <?=$is_current_month&&$i==$day?'today':''?>" original-title="<?=$n?>" style="display: block; ">
                    <?=$i?><span><?=$xingqi?></span>
                </div>
                <?
                }
                ?>
                <div class="clear"></div>
            </div>
        </div>
        
        <div class="modal fade hide" id="myModal">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>添加笔记</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="input01">日期</label>
                        <div class="controls">
                            <span class="input-xlarge uneditable-input" id="newDate"></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="input01">笔记内容</label>
                        <div class="controls">
                          <textarea style="width:330px;height: 150px;" id="newNote"></textarea>
                          <p class="help-block">暂时不支持Html</p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn" data-dismiss="modal">关闭</a>
                <a href="#" class="btn btn-primary" id="addNote">保存更新</a>
            </div>
        </div>
    </body>
</html>