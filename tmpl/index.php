<!DOCTYPE html>
<html lang="en">
        <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta http-equiv="pragma" content="no-cach" /> 
                <meta http-equiv="cache-control" content="no-cache" /> 
                <meta http-equiv="expires" content="0" />
                <title>
                        日历笔记--精彩只为你而留
                </title>
                <!-- Simple CSS file for HTML page -->
                <link rel="stylesheet" href="css/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
                <!-- jCalendar CSS - Contains Tipsy CSS - Delete as needed -->
                <link rel="stylesheet" href="css/rili.css" type="text/css" media="screen" title="no title" charset="utf-8">
                <link rel="stylesheet" href="css/bootstrap.css" type="text/css" media="screen" title="no title" charset="utf-8">
                <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
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
                                                        <input class="input-xlarge uneditable-input" id="newDate" />
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
                <script src="js/jquery-1.8.2.min.js" type="text/javascript"></script>
                <script src="js/calendar.js" type="text/javascript" charset="utf-8"></script>
                <script src="js/tipsy.js" type="text/javascript" charset="utf-8"></script>
                <script src="js/scrollTo.js" type="text/javascript" charset="utf-8"></script>
                <script src="js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
                <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
                <script>
                        var noteArr = <?= json_encode($note) ?>;
                        $(document).ready(function() {
                                $("#main-container").calendar({
                                        tipsy_gravity: 's', // How do you want to anchor the tipsy notification? (n / s / e / w)
//                                        click_callback: calendar_callback, // Callback to return the clicked date
                                        year: "2013", // Optional, defaults to current year - pass in a year - Integer or String
                                        scroll_to_date: false, // Scroll to the current date?
                                        note:noteArr
                                });
                                $( "#newDate" ).datepicker({
                                        'dateFormat':'yy-mm-dd'
                                });
                                $("#newDate").on('change',function(){
                                        var d = $(this).val();
                                        var dayNote = "";
                                        if(noteArr.hasOwnProperty(d)){
                                                dayNote = noteArr[d];
                                        }
                                        $("#newNote").val(dayNote);
                                });
                                $('#addNote').bind('click',function(){
                                        var note = $('#newNote').val();
                                        var dateValue = $('#newDate').val();
                                        var d = dateValue.split("-");
                                        month = d[1];
                                        year = d[0];
                                        day = d[2];
                                        $.ajax({
                                                type: "POST",
                                                url: "add.php",
                                                data: {year:year,month:month,day:day,note:note},
                                                dataType:"json",
                                                success: function(data){
                                                        if(data==1){
                                                                window.location.reload();
//                                                                var s = parseInt(month)+"/"+parseInt(day)+"/"+year;
//                                                                var editEle = $("div[data-date='"+s+"']");
//                                                                $('#myModal').modal('hide');
//                                                                noteArr[dateValue] = note;
//                                                                editEle.addClass('note').attr('data-content',note);
//                                                                $('.note').popover({
//                                                                        'animation':'toggle',
//                                                                        'placement':'top'
//                                                                });
                                                        }else{
                                                                return false; 
                                                        }
                                                }
                                        });
                                });
                        });

                        //回调函数
                        var calendar_callback = function(date) {
                                var k = date.year+"_"+date.month+"_"+date.day;
                                if(noteArr[k]){
                                        alert(noteArr[k]);
                                }
                        }
                </script>
        </body>
</html>